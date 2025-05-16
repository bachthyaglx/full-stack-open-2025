import { Pressable, StyleSheet, Text } from 'react-native';
import { Link } from 'react-router-native';
import theme from '../theme';

const styles = StyleSheet.create({
  tabText: {
    color: theme.colors.appBarText,
    fontWeight: 'bold',
    fontSize: 16,
    paddingHorizontal: 10,
  },
});

const AppBarTab = ({ to, children }) => {
  return (
    <Link to={to} component={Pressable}>
      <Text style={styles.tabText}>{children}</Text>
    </Link>
  );
};

export default AppBarTab;
