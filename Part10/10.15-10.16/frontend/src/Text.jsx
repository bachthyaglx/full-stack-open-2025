import { Text as NativeText, StyleSheet } from 'react-native';
import theme from './theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main, // Apply platform-specific font
  },
});

const Text = ({ style, ...props }) => {
  return <NativeText style={[styles.text, style]} {...props} />;
};

export default Text;
