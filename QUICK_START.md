# Quick Start Guide - Noca Number Hack

## Prerequisites

Before you begin, ensure you have the following installed:

### Required Software
- **Node.js**: v20 or higher
- **npm**: v10 or higher (comes with Node.js)
- **Git**: Latest version

### For Android Development
- **Java Development Kit (JDK)**: v17 or higher
- **Android Studio**: Latest stable version
- **Android SDK**: API Level 33 or higher
- **Android Emulator** or a physical Android device

### For iOS Development (macOS only)
- **Xcode**: Latest stable version (15.0+)
- **CocoaPods**: Latest version
- **iOS Simulator** or a physical iOS device
- **Xcode Command Line Tools**

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/pankajsaini3415/spinnerapk.git
cd spinnerapk
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- React Native core
- Navigation libraries
- Animation libraries
- WebView components
- And more...

### 3. iOS Setup (macOS only)

```bash
# Install Ruby bundler (if not already installed)
gem install bundler

# Install Ruby dependencies
cd ios
bundle install

# Install CocoaPods dependencies
bundle exec pod install

# Return to project root
cd ..
```

### 4. Android Setup

No additional setup required! React Native CLI will handle Android dependencies automatically.

## Running the App

### Start Metro Bundler

In one terminal window, start the Metro bundler:

```bash
npm start
```

Keep this running while developing.

### Run on Android

In a new terminal window:

```bash
npm run android
```

**First-time Android setup:**
1. Open Android Studio
2. Open AVD Manager (Android Virtual Device)
3. Create a new virtual device or start an existing one
4. Wait for the emulator to fully boot
5. Run `npm run android`

**Using a physical device:**
1. Enable Developer Options on your Android device
2. Enable USB Debugging
3. Connect via USB
4. Trust the computer when prompted
5. Run `npm run android`

### Run on iOS (macOS only)

In a new terminal window:

```bash
npm run ios
```

**First-time iOS setup:**
1. Open Xcode
2. Go to Xcode → Preferences → Accounts
3. Add your Apple ID
4. Open the iOS Simulator app
5. Run `npm run ios`

**Using a physical device:**
1. Open `ios/NocaNumberHack.xcworkspace` in Xcode
2. Select your device from the device dropdown
3. Click the Run button or press Cmd+R

## Development Commands

```bash
# Start Metro bundler
npm start

# Start with cache reset
npm start -- --reset-cache

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run linter
npm run lint

# Run tests
npm test

# Type check
npx tsc --noEmit
```

## Project Structure

```
spinnerapk/
├── android/              # Android native code
├── ios/                  # iOS native code
├── src/
│   ├── components/       # React components
│   │   ├── SplashScreen.tsx
│   │   ├── WebViewContainer.tsx
│   │   └── WingoResultCard.tsx
│   └── constants/        # App constants
│       ├── colors.ts
│       └── config.ts
├── App.tsx              # Root component
├── index.js             # App entry point
├── package.json         # Dependencies
└── README.md           # Main documentation
```

## Troubleshooting

### Metro Bundler Issues

**Problem:** Metro won't start or shows caching errors

**Solution:**
```bash
# Clear Metro cache
npm start -- --reset-cache

# OR clean everything
rm -rf node_modules
rm -rf ios/Pods
rm -rf ios/Podfile.lock
npm install
cd ios && pod install && cd ..
```

### Android Build Errors

**Problem:** Gradle build fails

**Solution:**
```bash
# Clean Android build
cd android
./gradlew clean
cd ..

# Rebuild
npm run android
```

**Problem:** "SDK location not found"

**Solution:**
Create `android/local.properties`:
```properties
sdk.dir=/Users/YOUR_USERNAME/Library/Android/sdk
# Or on Windows: C:\\Users\\YOUR_USERNAME\\AppData\\Local\\Android\\Sdk
```

### iOS Build Errors

**Problem:** CocoaPods errors

**Solution:**
```bash
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..
npm run ios
```

**Problem:** "Command PhaseScriptExecution failed"

**Solution:**
1. Open Xcode
2. Product → Clean Build Folder
3. Close Xcode
4. Delete `ios/build` folder
5. Run `npm run ios` again

### Module Not Found Errors

**Problem:** "Unable to resolve module X"

**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules
npm install

# Clear Metro cache
npm start -- --reset-cache
```

### WebView Not Loading

**Problem:** WebView shows blank or error

**Solutions:**
1. **Check internet connection**
2. **iOS:** Verify `Info.plist` has `NSAppTransportSecurity` properly set
3. **Android:** Verify `AndroidManifest.xml` has `INTERNET` permission
4. **Test with a simple URL first** (e.g., https://google.com)

### Animations Not Working

**Problem:** Animations stutter or don't show

**Solutions:**
1. **Verify babel config has Reanimated plugin:**
   ```js
   // babel.config.js
   plugins: ['react-native-reanimated/plugin']
   ```
2. **Rebuild the app completely:**
   ```bash
   # Clean and rebuild
   cd android && ./gradlew clean && cd ..
   npm run android
   ```
3. **Check device performance:** Animations require sufficient device resources

## Development Tips

### Hot Reloading

- **Fast Refresh** is enabled by default
- Save any file to see changes immediately
- Shake device or press Cmd+D (iOS) / Cmd+M (Android) for dev menu

### Debugging

**React Native Debugger:**
1. Install React Native Debugger app
2. Shake device → Enable Remote JS Debugging
3. Debugger opens automatically

**Chrome DevTools:**
1. Shake device → Enable Remote JS Debugging
2. Open Chrome → `chrome://inspect`
3. Click "inspect" under your app

**Console Logs:**
```bash
# Watch logs in terminal
npx react-native log-android  # For Android
npx react-native log-ios      # For iOS
```

### Code Style

The project uses ESLint and Prettier:
```bash
# Check code style
npm run lint

# Auto-fix issues
npx eslint . --fix
```

## Next Steps

1. ✅ Run the app on your device/emulator
2. ✅ Explore the splash screen animation
3. ✅ Navigate to the WebView
4. ✅ Go to a Wingo page to see the results card
5. ✅ Check the code structure
6. ✅ Read FEATURES.md for detailed feature information
7. ✅ Read TECHNICAL_DOCS.md for architecture details

## Getting Help

### Documentation
- **README.md** - Project overview
- **FEATURES.md** - Feature descriptions
- **TECHNICAL_DOCS.md** - Technical architecture
- **QUICK_START.md** - This guide

### React Native Resources
- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [React Native WebView](https://github.com/react-native-webview/react-native-webview)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [React Navigation](https://reactnavigation.org/)

### Community
- [React Native Community](https://reactnative.dev/community/overview)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/react-native)
- [GitHub Issues](https://github.com/pankajsaini3415/spinnerapk/issues)

## Common Questions

**Q: How do I change the WebView URL?**  
A: Edit `src/constants/config.ts` and modify the `webViewUrl` property.

**Q: How do I change the splash screen duration?**  
A: Edit `src/constants/config.ts` and modify the `splashDuration` property.

**Q: Can I customize the colors?**  
A: Yes! Edit `src/constants/colors.ts` to change the entire color scheme.

**Q: How do I add more features?**  
A: Add new components in `src/components/` and import them in `App.tsx`.

**Q: Is the app production-ready?**  
A: Yes! The app is fully functional and follows React Native best practices.

---

**Happy Coding! 🚀**

If you encounter any issues not covered here, please open an issue on GitHub.
