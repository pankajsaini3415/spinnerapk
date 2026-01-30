import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, gradients } from '../constants/colors';
import { config } from '../constants/config';

const { width } = Dimensions.get('window');

interface WingoResult {
  id: number;
  value: string;
  color?: string;
  backgroundColor?: string;
}

interface WingoResultCardProps {
  data: {
    timestamp: string;
    results: WingoResult[];
  } | null;
}

export const WingoResultCard: React.FC<WingoResultCardProps> = ({ data }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-50)).current;
  const scaleAnims = useRef(
    data?.results?.map(() => new Animated.Value(0)) || []
  ).current;

  useEffect(() => {
    if (data && data.results.length > 0) {
      // Reset animations
      fadeAnim.setValue(0);
      slideAnim.setValue(-50);

      // Animate container
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();

      // Stagger animate result items
      const animations = data.results.slice(0, 10).map((_, index) => {
        return Animated.sequence([
          Animated.delay(index * 100),
          Animated.spring(scaleAnims[index] || new Animated.Value(0), {
            toValue: 1,
            tension: 50,
            friction: 7,
            useNativeDriver: true,
          }),
        ]);
      });

      Animated.stagger(50, animations).start();
    }
  }, [data]);

  if (!data || !data.results || data.results.length === 0) {
    return null;
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <LinearGradient
        colors={gradients.wingo}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        {/* Glass morphism overlay */}
        <View style={styles.glassOverlay}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.iconContainer}>
                <LinearGradient
                  colors={[colors.gradient2Start, colors.gradient2End]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.iconGradient}
                >
                  <Text style={styles.iconText}>W</Text>
                </LinearGradient>
              </View>
              <View>
                <Text style={styles.headerTitle}>Wingo Results</Text>
                <Text style={styles.headerSubtitle}>
                  Live • {formatTimestamp(data.timestamp)}
                </Text>
              </View>
            </View>
            <View style={styles.liveIndicator}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>LIVE</Text>
            </View>
          </View>

          {/* Results Grid */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.resultsContainer}
          >
            {data.results.slice(0, 10).map((result, index) => {
              const scaleAnim = scaleAnims[index] || new Animated.Value(1);
              
              return (
                <Animated.View
                  key={`${result.id}-${index}`}
                  style={[
                    styles.resultItem,
                    {
                      transform: [{ scale: scaleAnim }],
                    },
                  ]}
                >
                  <LinearGradient
                    colors={[colors.glass, colors.glassBorder]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.resultItemGradient}
                  >
                    <Text style={styles.resultValue}>{result.value}</Text>
                    <View style={styles.resultIndex}>
                      <Text style={styles.resultIndexText}>#{index + 1}</Text>
                    </View>
                  </LinearGradient>
                </Animated.View>
              );
            })}
          </ScrollView>

          {/* Stats Footer */}
          <View style={styles.footer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{data.results.length}</Text>
              <Text style={styles.statLabel}>Total Results</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {data.results.slice(0, 10).length}
              </Text>
              <Text style={styles.statLabel}>Displaying</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>●</Text>
              <Text style={styles.statLabel}>Active</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    padding: config.spacing.md,
  },
  card: {
    borderRadius: config.borderRadius.large,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 12,
  },
  glassOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(10px)',
    padding: config.spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: config.spacing.md,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
    marginRight: config.spacing.sm,
    borderWidth: 2,
    borderColor: colors.textPrimary,
  },
  iconGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.textPrimary,
  },
  headerTitle: {
    fontSize: config.typography.fontSizeMedium,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  headerSubtitle: {
    fontSize: config.typography.fontSizeSmall,
    color: colors.textSecondary,
    marginTop: 2,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.error,
    paddingHorizontal: config.spacing.sm,
    paddingVertical: config.spacing.xs,
    borderRadius: config.borderRadius.small,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.textPrimary,
    marginRight: config.spacing.xs,
  },
  liveText: {
    fontSize: config.typography.fontSizeTiny,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  resultsContainer: {
    paddingVertical: config.spacing.sm,
  },
  resultItem: {
    marginRight: config.spacing.sm,
  },
  resultItemGradient: {
    width: 80,
    height: 80,
    borderRadius: config.borderRadius.medium,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  resultValue: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  resultIndex: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: colors.overlay,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  resultIndexText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: config.spacing.md,
    paddingTop: config.spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.glassBorder,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: config.typography.fontSizeMedium,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  statLabel: {
    fontSize: config.typography.fontSizeTiny,
    color: colors.textSecondary,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: colors.glassBorder,
  },
});
