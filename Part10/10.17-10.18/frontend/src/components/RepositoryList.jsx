import { FlatList, View, StyleSheet, ActivityIndicator, Text, Pressable } from 'react-native';
import React, { useState } from 'react';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem item={item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

const RepositoryList = () => {
  const { repositories, loading, error } = useRepositories();

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error loading repositories</Text>;
  }

  return (
    <FlatList
      data={repositories ? repositories.edges.map(edge => edge.node) : []}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <RepositoryItem item={item} />}
    />
  );
};

export default RepositoryList;
