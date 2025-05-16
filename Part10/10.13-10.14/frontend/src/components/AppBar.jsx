import { View, ScrollView, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
  },
  scrollView: {
    flexDirection: 'row',
  },

});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} horizontal flex>
        <AppBarTab to="/">Repositories</AppBarTab>
        <AppBarTab to="/sign-in">Sign in</AppBarTab>
      </ScrollView>
    </View>
  );
};

export default AppBar;
