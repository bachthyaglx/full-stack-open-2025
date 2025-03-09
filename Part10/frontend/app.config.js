import 'dotenv/config';

export default {
  name: "rate-repository-app",
  slug: "rate-repository-app",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff"
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.farahcodes.raterepositoryapp"
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff"
    },
    package: "com.farahcodes.raterepositoryapp"
  },
  web: {
    favicon: "./assets/favicon.png"
  },
  extra: {
    env: process.env.ENV,
    eas: {
      projectId: "d41a0a55-c11c-4ca3-b94d-1dd386cfe70a"
    }
  }
}