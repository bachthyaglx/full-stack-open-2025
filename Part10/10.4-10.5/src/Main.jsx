import { View, StyleSheet } from 'react-native';
import AppBar from './components/AppBar';
import RepositoryList from './components/RepositoryList';
import theme from './theme';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: theme.colors.background,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <RepositoryList />
    </View>
  );
};

export default Main;
