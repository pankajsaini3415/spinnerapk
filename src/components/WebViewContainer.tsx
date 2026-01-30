import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  Animated,
} from 'react-native';
import { WebView } from 'react-native-webview';
import LinearGradient from 'react-native-linear-gradient';
import { colors, gradients } from '../constants/colors';
import { config } from '../constants/config';

interface WebViewContainerProps {
  onWingoPageDetected: (isWingoPage: boolean) => void;
  onWingoDataExtracted: (data: any) => void;
}

export const WebViewContainer: React.FC<WebViewContainerProps> = ({
  onWingoPageDetected,
  onWingoDataExtracted,
}) => {
  const webViewRef = useRef<WebView>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const handleNavigationStateChange = (navState: any) => {
    const { url } = navState;
    
    // Check if we're on the Wingo page
    const isWingoPage = url.includes('/wingo') || url.includes('wingo');
    onWingoPageDetected(isWingoPage);

    if (isWingoPage) {
      // Inject JavaScript to extract Wingo data
      injectWingoDataExtractor();
    }
  };

  const injectWingoDataExtractor = () => {
    const jsCode = `
      (function() {
        try {
          // Function to extract Wingo header results
          function extractWingoData() {
            const wingoData = {
              timestamp: new Date().toISOString(),
              results: [],
            };

            // Look for result elements in the header
            // Adjust selectors based on actual page structure
            const headerResults = document.querySelectorAll('.result-item, .wingo-result, [class*="result"]');
            
            if (headerResults.length > 0) {
              headerResults.forEach((element, index) => {
                const text = element.textContent || element.innerText;
                const color = window.getComputedStyle(element).color;
                const bgColor = window.getComputedStyle(element).backgroundColor;
                
                wingoData.results.push({
                  id: index,
                  value: text.trim(),
                  color: color,
                  backgroundColor: bgColor,
                });
              });
            } else {
              // Fallback: try to get any visible numbers/results
              const allElements = document.querySelectorAll('div, span, p');
              const numberPattern = /\\b\\d+\\b/;
              
              allElements.forEach((element, index) => {
                const text = element.textContent || element.innerText;
                if (text && numberPattern.test(text) && text.length < 10) {
                  wingoData.results.push({
                    id: index,
                    value: text.trim(),
                    color: 'inherit',
                    backgroundColor: 'transparent',
                  });
                }
              });
              
              // Limit to first 10 results
              wingoData.results = wingoData.results.slice(0, 10);
            }

            return wingoData;
          }

          // Extract data immediately
          const data = extractWingoData();
          window.ReactNativeWebView.postMessage(JSON.stringify(data));

          // Set up observer for dynamic content
          const observer = new MutationObserver(() => {
            const newData = extractWingoData();
            window.ReactNativeWebView.postMessage(JSON.stringify(newData));
          });

          observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
          });

          // Periodic extraction (every 5 seconds)
          setInterval(() => {
            const periodicData = extractWingoData();
            window.ReactNativeWebView.postMessage(JSON.stringify(periodicData));
          }, 5000);

        } catch (error) {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            error: error.message,
            timestamp: new Date().toISOString(),
          }));
        }
      })();
      true;
    `;

    webViewRef.current?.injectJavaScript(jsCode);
  };

  const handleMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.error) {
        console.error('Wingo data extraction error:', data.error);
      } else {
        onWingoDataExtracted(data);
      }
    } catch (error) {
      console.error('Failed to parse message from WebView:', error);
    }
  };

  const handleLoadEnd = () => {
    setLoading(false);
    setError(null);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleError = (syntheticEvent: any) => {
    const { nativeEvent } = syntheticEvent;
    setLoading(false);
    setError(nativeEvent.description || 'Failed to load page');
  };

  if (error) {
    return (
      <LinearGradient
        colors={gradients.primary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.errorContainer}
      >
        <View style={styles.errorContent}>
          <Text style={styles.errorTitle}>Oops!</Text>
          <Text style={styles.errorMessage}>{error}</Text>
          <Text style={styles.errorHint}>
            Please check your internet connection and try again.
          </Text>
        </View>
      </LinearGradient>
    );
  }

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingContainer}>
          <LinearGradient
            colors={gradients.primary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.loadingGradient}
          >
            <ActivityIndicator size="large" color={colors.textPrimary} />
            <Text style={styles.loadingText}>Loading...</Text>
          </LinearGradient>
        </View>
      )}
      
      <Animated.View style={[styles.webViewContainer, { opacity: fadeAnim }]}>
        <WebView
          ref={webViewRef}
          source={{ uri: config.webViewUrl }}
          style={styles.webView}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          onNavigationStateChange={handleNavigationStateChange}
          onMessage={handleMessage}
          onLoadEnd={handleLoadEnd}
          onError={handleError}
          onHttpError={handleError}
          allowsBackForwardNavigationGestures={true}
          mixedContentMode="always"
          thirdPartyCookiesEnabled={true}
          sharedCookiesEnabled={true}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  webViewContainer: {
    flex: 1,
  },
  webView: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
  loadingGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: config.spacing.md,
    fontSize: config.typography.fontSizeNormal,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: config.spacing.xl,
  },
  errorContent: {
    backgroundColor: colors.glass,
    borderRadius: config.borderRadius.large,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    padding: config.spacing.xl,
    alignItems: 'center',
  },
  errorTitle: {
    fontSize: config.typography.fontSizeLarge,
    fontWeight: '800',
    color: colors.error,
    marginBottom: config.spacing.md,
  },
  errorMessage: {
    fontSize: config.typography.fontSizeNormal,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: config.spacing.sm,
  },
  errorHint: {
    fontSize: config.typography.fontSizeSmall,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
