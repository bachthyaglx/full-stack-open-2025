import { Platform } from 'react-native';

const theme = {
  colors: {
    appBarBackground: '#24292e',
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
    white: '#ffffff',
    mainBackground: '#e1e4e8',
    error: '#d73a4a',
  },
    fontSizes: {
    body: 14,
    subheading: 16,
    heading: 18,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System',
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
  roundness: 3,
  padding: {
    small: 8,
    medium: 16,
    large: 24,
  },
  margins: {
    small: 8,
    medium: 16,
    large: 24,
  },
};

export default theme;