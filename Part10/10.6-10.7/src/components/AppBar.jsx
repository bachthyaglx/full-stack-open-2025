import { View, ScrollView, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
  },
  scrollContainer: {
    flexDirection: 'row', // Lay out tabs in a row
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        <AppBarTab to="/">Repositories</AppBarTab>
        <AppBarTab to="/signin">Sign in</AppBarTab>
      </ScrollView>
    </View>
  );
};

export default AppBar;
