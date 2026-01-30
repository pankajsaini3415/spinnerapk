# Noca Number Hack - Technical Documentation

## Overview

This is a premium React Native application that demonstrates:
- Animated splash screen with particle effects
- WebView integration with real-time data extraction
- Premium UI/UX with glass morphism and gradients
- Smooth 60fps animations using React Native Reanimated

## Architecture

### Component Structure

```
App.tsx (Root Component)
├── SplashScreen.tsx
│   ├── Premium gradient background
│   ├── Animated logo with rotation
│   ├── Particle effects
│   └── Auto-transition after 3.5 seconds
│
└── Main App View
    ├── WebViewContainer.tsx
    │   ├── Loads external URL
    │   ├── Detects Wingo page navigation
    │   ├── Injects JavaScript for data extraction
    │   └── Sends extracted data via postMessage
    │
    └── WingoResultCard.tsx (Conditional)
        ├── Displays when on Wingo page
        ├── Shows top header results
        ├── Animated card with glass morphism
        └── Real-time data updates
```

## Features Implementation

### 1. Animated Splash Screen

**File:** `src/components/SplashScreen.tsx`

**Features:**
- Multiple synchronized animations:
  - Fade in effect (0 → 1 opacity)
  - Scale animation (0.3 → 1.0)
  - Rotation animation (0° → 360°)
  - Staggered text animations
- Three particle effects with different timing
- Gradient background using react-native-linear-gradient
- Auto-navigation after configured duration

**Key Technologies:**
- React Native Animated API
- LinearGradient for premium backgrounds
- StatusBar control for full-screen experience

### 2. WebView Container

**File:** `src/components/WebViewContainer.tsx`

**Features:**
- Loads URL: `https://tashanwin27.com/#/register?invitationCode=163223471547`
- JavaScript enabled for dynamic content
- DOM storage enabled
- Navigation state monitoring
- Automatic Wingo page detection
- Error handling with friendly UI
- Loading states with animated indicators

**Data Extraction Process:**
1. Monitors navigation state changes
2. Detects Wingo page by URL pattern
3. Injects JavaScript code into the page
4. Extracts header result data using DOM queries
5. Sets up MutationObserver for dynamic updates
6. Sends data back via window.ReactNativeWebView.postMessage
7. Periodic extraction every 5 seconds

**JavaScript Injection Code:**
- Searches for result elements using multiple selectors
- Extracts text content, colors, and styles
- Handles dynamic content with MutationObserver
- Fallback strategies for different page structures

### 3. Wingo Result Display

**File:** `src/components/WingoResultCard.tsx`

**Features:**
- Premium card design with gradient background
- Glass morphism overlay effect
- Horizontal scrollable results
- Animated entrance:
  - Fade in from transparent
  - Slide down from top (-50px → 0)
  - Staggered scale animations for each result item
- Live indicator badge
- Statistics footer showing total/displayed/status
- Real-time updates with smooth transitions

**Animation Details:**
- Container animations: 400ms fade + spring slide
- Result items: Staggered 100ms delay with spring scale
- Uses React Native Reanimated for smooth 60fps performance

## Configuration

### Colors & Gradients

**File:** `src/constants/colors.ts`

Defines premium color scheme:
- Primary colors (Indigo, Purple, Pink)
- Multiple gradient combinations
- Dark theme colors
- Glass morphism colors with transparency

### App Configuration

**File:** `src/constants/config.ts`

Configurable values:
- App name
- WebView URL
- Splash duration (3500ms)
- Animation timings
- Typography sizes
- Spacing values (8px grid system)
- Border radius values

## State Management

The app uses React hooks for state management:

```typescript
// App.tsx states
const [showSplash, setShowSplash] = useState(true);
const [isWingoPage, setIsWingoPage] = useState(false);
const [wingoData, setWingoData] = useState<any>(null);
```

**State Flow:**
1. App starts with `showSplash = true`
2. SplashScreen displays for 3.5 seconds
3. `onFinish` callback sets `showSplash = false`
4. Main app view renders with WebView
5. WebView detects Wingo page navigation
6. `onWingoPageDetected` sets `isWingoPage = true`
7. JavaScript extraction sends data
8. `onWingoDataExtracted` updates `wingoData`
9. WingoResultCard renders conditionally when data exists

## Animations Performance

All animations use `useNativeDriver: true` for optimal performance:
- Runs on native thread (60fps)
- No JavaScript thread blocking
- Smooth even on low-end devices

**Animation Types Used:**
- `Animated.timing`: Linear interpolation
- `Animated.spring`: Physics-based natural motion
- `Animated.sequence`: Chained animations
- `Animated.parallel`: Simultaneous animations
- `Animated.stagger`: Delayed sequence
- `Animated.loop`: Continuous effects

## Native Configuration

### Android

**Permissions:** (AndroidManifest.xml)
- INTERNET permission enabled
- Clear text traffic allowed

**Build Configuration:**
- Auto-linking enabled for all native modules
- Hermes engine enabled
- Minification disabled for debug
- Debug keystore configured

### iOS

**Permissions:** (Info.plist)
- NSAppTransportSecurity allows arbitrary loads
- Local networking enabled

**Podfile:**
- Native modules auto-linked
- React Native configuration applied

## Dependencies

### Core Dependencies
- `react-native@0.83.1` - Framework
- `react@19.2.0` - UI library

### UI & Animation
- `react-native-reanimated@^3.19.2` - 60fps animations
- `react-native-linear-gradient@^2.8.3` - Gradient backgrounds
- `react-native-gesture-handler@^2.24.0` - Touch gestures
- `lottie-react-native@^6.7.0` - Complex animations (if needed)

### Navigation & Web
- `@react-navigation/native@^7.0.14` - Navigation framework
- `@react-navigation/stack@^7.2.2` - Stack navigator
- `react-native-webview@^13.8.0` - WebView component

### Utilities
- `react-native-safe-area-context@^5.5.2` - Safe area handling
- `react-native-screens@^4.8.0` - Native screen optimization
- `@react-native-async-storage/async-storage@^2.2.0` - Data persistence

## Code Quality

### Linting
- ESLint configured with React Native preset
- TypeScript ESLint rules
- React Hooks exhaustive deps checking

### TypeScript
- Strict type checking enabled
- All components typed
- No `any` types (except WebView event data)

### Testing
- Jest configured
- Basic App test included
- Test infrastructure ready for expansion

## Build & Run

### Development
```bash
# Start Metro bundler
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios
```

### Production Build

**Android:**
```bash
cd android
./gradlew assembleRelease
# APK: android/app/build/outputs/apk/release/app-release.apk
```

**iOS:**
```bash
cd ios
xcodebuild -workspace NocaNumberHack.xcworkspace -scheme NocaNumberHack -configuration Release
```

## Troubleshooting

### Common Issues

1. **Metro bundler won't start**
   ```bash
   npm start -- --reset-cache
   ```

2. **Dependencies not linking**
   ```bash
   # Android
   cd android && ./gradlew clean
   
   # iOS
   cd ios && pod install
   ```

3. **WebView not loading**
   - Check internet connection
   - Verify iOS Info.plist has NSAppTransportSecurity settings
   - Check Android manifest has INTERNET permission

4. **Animations stuttering**
   - Ensure `react-native-reanimated/plugin` in babel.config.js
   - Rebuild app after Reanimated changes
   - Check useNativeDriver is true

## Future Enhancements

Potential improvements:
- Add pull-to-refresh on Wingo results
- Implement result history
- Add sound effects for animations
- Dark/light theme toggle
- Offline mode with cached data
- Push notifications for new results
- Haptic feedback on interactions
- Biometric authentication
- Multi-language support

## Performance Metrics

Target performance:
- Splash screen: 60fps animations
- WebView rendering: Smooth scrolling
- Wingo card: 60fps entrance animations
- Data updates: <100ms latency
- Memory usage: <150MB
- Cold start: <3 seconds
- Hot reload: <1 second

## Security Considerations

- WebView loads HTTPS URLs only (when possible)
- No sensitive data stored locally
- JavaScript injection sanitized
- No eval() or unsafe code execution
- Input validation on extracted data
- Error boundaries for crash prevention

## Accessibility

- Semantic component structure
- Screen reader compatible
- High contrast colors
- Touch target sizes (44x44 minimum)
- Reduced motion support (planned)

## License

Private/Proprietary

## Author

Pankaj Saini
