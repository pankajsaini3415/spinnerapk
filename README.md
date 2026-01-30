# Noca Number Hack

A premium React Native application with animated splash screen, WebView integration, and real-time Wingo data display.

## Features

- ✨ **Premium Animated Splash Screen** - Beautiful gradient animations with particles
- 🌐 **WebView Integration** - Seamless web content loading
- 🎯 **Wingo Data Extraction** - Real-time data extraction and display
- 🎨 **Premium UI/UX** - Glass morphism, gradients, and smooth animations
- ⚡ **60 FPS Animations** - Built with React Native Reanimated
- 📱 **Responsive Design** - Works on all screen sizes

## Tech Stack

- React Native 0.83.1
- TypeScript
- React Native Reanimated 3
- React Native WebView
- React Native Linear Gradient
- Lottie React Native
- React Navigation

## Setup Instructions

### Prerequisites

- Node.js >= 20
- npm or yarn
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/pankajsaini3415/spinnerapk.git
cd spinnerapk
```

2. Install dependencies:
```bash
npm install
```

3. For iOS (macOS only):
```bash
cd ios
bundle install
bundle exec pod install
cd ..
```

### Running the App

#### Android
```bash
npm run android
```

#### iOS
```bash
npm run ios
```

#### Start Metro Bundler
```bash
npm start
```

## Project Structure

```
src/
├── components/
│   ├── SplashScreen.tsx       # Animated splash screen
│   ├── WebViewContainer.tsx   # WebView with data extraction
│   └── WingoResultCard.tsx    # Premium Wingo results display
├── constants/
│   ├── colors.ts              # Color palette and gradients
│   └── config.ts              # App configuration
└── App.tsx                     # Main application entry
```

## Features Details

### Splash Screen
- 3.5 second duration
- Gradient background with multiple colors
- Animated logo with rotation
- Particle effects
- Smooth transitions

### WebView
- JavaScript enabled
- DOM storage enabled
- Automatic Wingo page detection
- Real-time data extraction
- Error handling with friendly UI

### Wingo Results Display
- Glass morphism card design
- Smooth fade and slide animations
- Horizontal scrollable results
- Live indicator
- Statistics footer
- Auto-updates every 5 seconds

## Configuration

Edit `src/constants/config.ts` to customize:
- WebView URL
- Splash duration
- Animation timings
- Typography settings
- Spacing values

Edit `src/constants/colors.ts` to customize:
- Color palette
- Gradients
- Theme colors

## Scripts

- `npm start` - Start Metro bundler
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run lint` - Run ESLint
- `npm test` - Run tests

## Troubleshooting

If you encounter any issues:
1. Clear Metro cache: `npm start -- --reset-cache`
2. Clean build folders
3. Reinstall dependencies: `rm -rf node_modules && npm install`
4. For iOS: `cd ios && rm -rf Pods Podfile.lock && pod install`

## License

Private

## Author

Pankaj Saini
