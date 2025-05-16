/* eslint-disable no-undef */
import 'dotenv/config';

export default {
  name: '10.17-10.18',
  slug: '10.17-10.18',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
  },
  web: {
    favicon: './assets/favicon.png',
  },
  extra: {
    env: process.env.ENV,
    apolloUri: process.env.APOLLO_URI,
  },
};