// @ts-nocheck
import React from 'react';
import { View, StyleSheet, ScrollView, Text, Pressable } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';
import { useNavigate } from 'react-router-native';

// hooks
import { useMe } from '../hooks/useMe';
import useSignOut from '../hooks/useSignOut';
// theme
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    flexDirection: "row"
  },
  tab: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  tabText: {
    color: 'white',
    fontSize: 16,
  },
  scrollView: {
    flexDirection: 'row',
  },
});

const AppBarTab = ({ title, to = '', onPress = null }) => {
  if (onPress) {
    return (
      <Pressable onPress={onPress} style={styles.tab}>
        <Text style={styles.tabText}>{title}</Text>
      </Pressable>
    );
  }

  return (
    <Link to={to} style={styles.tab}>
      <Text style={styles.tabText}>{title}</Text>
    </Link>
  );
};

const AppBar = () => {
  const { me } = useMe();
  const signOut = useSignOut();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollView}>
        <AppBarTab title="Repositories" to="/" />
        {me ? (
          <>
            <AppBarTab title="Create a review" to="/create-review" />
            <AppBarTab title="My reviews" to="/my-reviews" />
            <AppBarTab title="Sign out" onPress={handleSignOut} />
          </>
        ) : (
          <>
            <AppBarTab title="Sign in" to="/signin" />
            <AppBarTab title="Sign up" to="/signup" />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;