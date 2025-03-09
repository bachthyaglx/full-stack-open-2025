import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    borderRadius: theme.roundness,
    padding: 12,
    fontSize: theme.fontSizes.body,
  },
  error: {
    borderColor: theme.colors.error,
  },
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [
    styles.textInput,
    error && styles.error,
    style,
  ];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;