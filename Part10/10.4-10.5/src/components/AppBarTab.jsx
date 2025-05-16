import { Pressable, StyleSheet, Text } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  tabText: {
    color: theme.colors.appBarText,
    fontWeight: 'bold',
    fontSize: 16,
    paddingHorizontal: 10,
  },
});

const AppBarTab = ({ children, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <Text style={styles.tabText}>{children}</Text>
    </Pressable>
  );
};

export default AppBarTab;
