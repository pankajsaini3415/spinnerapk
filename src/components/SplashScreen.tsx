import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, gradients } from '../constants/colors';
import { config } from '../constants/config';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const titleFadeAnim = useRef(new Animated.Value(0)).current;
  const subtitleFadeAnim = useRef(new Animated.Value(0)).current;
  
  // Particle animations
  const particle1 = useRef(new Animated.Value(0)).current;
  const particle2 = useRef(new Animated.Value(0)).current;
  const particle3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    StatusBar.setHidden(true);
    
    // Main logo animation sequence
    Animated.sequence([
      // Fade in and scale up logo
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]),
      // Subtle rotation
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      // Fade in title
      Animated.timing(titleFadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      // Fade in subtitle
      Animated.timing(subtitleFadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();

    // Particle animations (continuous)
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(particle1, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(particle1, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.delay(500),
          Animated.timing(particle2, {
            toValue: 1,
            duration: 2500,
            useNativeDriver: true,
          }),
          Animated.timing(particle2, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.delay(1000),
          Animated.timing(particle3, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(particle3, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();

    // Auto-navigate after splash duration
    const timer = setTimeout(() => {
      StatusBar.setHidden(false);
      onFinish();
    }, config.splashDuration);

    return () => {
      clearTimeout(timer);
      StatusBar.setHidden(false);
    };
  }, []);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // Particle interpolations
  const particle1Style = {
    opacity: particle1.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0.8, 0],
    }),
    transform: [
      {
        translateY: particle1.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -height * 0.3],
        }),
      },
      {
        translateX: particle1.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -width * 0.2],
        }),
      },
    ],
  };

  const particle2Style = {
    opacity: particle2.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0.6, 0],
    }),
    transform: [
      {
        translateY: particle2.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -height * 0.4],
        }),
      },
      {
        translateX: particle2.interpolate({
          inputRange: [0, 1],
          outputRange: [0, width * 0.3],
        }),
      },
    ],
  };

  const particle3Style = {
    opacity: particle3.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0.7, 0],
    }),
    transform: [
      {
        translateY: particle3.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -height * 0.5],
        }),
      },
      {
        translateX: particle3.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -width * 0.1],
        }),
      },
    ],
  };

  return (
    <LinearGradient
      colors={gradients.primary}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* Animated particles */}
      <Animated.View style={[styles.particle, particle1Style]} />
      <Animated.View style={[styles.particle, particle2Style]} />
      <Animated.View style={[styles.particle, particle3Style]} />

      {/* Main content */}
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Animated.View
          style={[
            styles.logoCircle,
            {
              transform: [{ rotate: rotation }],
            },
          ]}
        >
          <LinearGradient
            colors={[colors.gradient2Start, colors.gradient2End]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.logoGradient}
          >
            <Text style={styles.logoText}>N</Text>
          </LinearGradient>
        </Animated.View>
      </Animated.View>

      <Animated.View style={[styles.textContainer, { opacity: titleFadeAnim }]}>
        <Text style={styles.appName}>{config.appName}</Text>
      </Animated.View>

      <Animated.View style={[styles.subtitleContainer, { opacity: subtitleFadeAnim }]}>
        <Text style={styles.subtitle}>Premium Experience</Text>
        <View style={styles.dotContainer}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  particle: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: config.spacing.xl,
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 20,
  },
  logoGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 60,
    fontWeight: '900',
    color: colors.textPrimary,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: config.spacing.md,
  },
  appName: {
    fontSize: config.typography.fontSizeLarge,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitleContainer: {
    alignItems: 'center',
    position: 'absolute',
    bottom: config.spacing.xxl * 2,
  },
  subtitle: {
    fontSize: config.typography.fontSizeNormal,
    color: colors.textSecondary,
    fontWeight: '600',
    marginBottom: config.spacing.md,
  },
  dotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.glass,
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: colors.textPrimary,
  },
});
