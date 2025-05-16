import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';

import RepositoryList from './components/RepositoryList';
import AppBar from './components/AppBar';
import SignIn from './components/SignIn';
import SingleRepository from './components/SingleRepository';
import CreateReview from './components/CreateReview';
import SignUp from './components/SignUp';
import MyReviews from './components/MyReviews';
import theme from './theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="sign-in" element={<SignIn />} exact />
        <Route path="repositories/:id" element={<SingleRepository />} exact />
        <Route path="create-review" element={<CreateReview />} exact />
        <Route path="sign-up" element={<SignUp />} exact />
        <Route path="my-reviews" element={<MyReviews />} exact />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;