import { Platform } from 'react-native';

const theme = {
  colors: {
    appBarBackground: '#24292e',
    appBarText: '#ffffff',
    primary: '#0366d6',
    textPrimary: '#24292e',
    textSecondary: '#586069',
    background: '#e1e4e8',
    cardBackground: '#ffffff',
  },
  fontSizes: {
    body: 16,
    subheading: 18,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System', // Default for other platforms
    }),
  },
};
  
export default theme;
  