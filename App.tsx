import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SplashScreen } from './src/components/SplashScreen';
import { WebViewContainer } from './src/components/WebViewContainer';
import { WingoResultCard } from './src/components/WingoResultCard';
import { colors } from './src/constants/colors';

function App(): React.JSX.Element {
  const [showSplash, setShowSplash] = useState(true);
  const [isWingoPage, setIsWingoPage] = useState(false);
  const [wingoData, setWingoData] = useState<any>(null);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  const handleWingoPageDetected = (detected: boolean) => {
    setIsWingoPage(detected);
    if (!detected) {
      setWingoData(null);
    }
  };

  const handleWingoDataExtracted = (data: any) => {
    if (data && data.results && data.results.length > 0) {
      setWingoData(data);
    }
  };

  if (showSplash) {
    return (
      <GestureHandlerRootView style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <SplashScreen onFinish={handleSplashFinish} />
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={colors.background}
        />
        <View style={styles.container}>
          <WebViewContainer
            onWingoPageDetected={handleWingoPageDetected}
            onWingoDataExtracted={handleWingoDataExtracted}
          />
          {isWingoPage && wingoData && (
            <WingoResultCard data={wingoData} />
          )}
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default App;
