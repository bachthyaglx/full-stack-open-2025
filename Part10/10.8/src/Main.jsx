import { View, StyleSheet } from 'react-native';
import AppBar from './components/AppBar';
import RepositoryList from './components/RepositoryList';
import theme from './theme';
import { Route, Routes, Navigate } from 'react-router-native';
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
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
