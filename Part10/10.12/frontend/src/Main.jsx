import { View, StyleSheet } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';
import RepositoryList from './components/RepositoryList';
import AppBar from './components/AppBar';
import theme from './theme';
import SignIn from './components/SignIn';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.background,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="sign-in" element={<SignIn />} exact />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
