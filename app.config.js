export default {
  expo: {
    name: "PixelTale React",
    slug: "PixelTale React",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    assetBundlePatterns: ["assets/fonts/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.pixeltale.reactapp",
      config: {
        googleMapsApiKey: process.env.EXPO_PUBLIC_MAPS_API_KEY,
      },
      infoPlist: {
        UIBackgroundModes: [
          "location",
          "fetch"
        ],
        NSLocationAlwaysAndWhenInUseUsageDescription: "Allows App to use location services in the foreground and background.",
      },
    },
    android: {
      package: "com.pixeltale.reactapp",
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      softwareKeyboardLayoutMode: "pan",
      permissions: [
        "android.permission.RECORD_AUDIO",
        "android.permission.ACCESS_FINE_LOCATION",
        "android.permission.ACCESS_COARSE_LOCATION"
      ],
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    splash: {
      image: "./assets/images/mountains-bg.jpg",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
      "expo-font",
      [
        "expo-image-picker",
        {
          photosPermission:
            "The app accesses your photos to let you share them with your friends.",
        },
      ],
      [
        "expo-location",
        {
            locationWhenInUsePermission:
            "Allow PixelTale React to use your location.",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
  },
};
