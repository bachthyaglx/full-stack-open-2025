// @ts-nocheck
import React from 'react';
import { FlatList, StyleSheet, View, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import RepositoryListHeader from './RepositoryListHeader';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
  repositories,
  onEndReach,
  sortBy,
  setSortBy,
  searchQuery,
  setSearchQuery,
  onRepositoryPress
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const renderHeader = () => (
    <RepositoryListHeader
      sortBy={sortBy}
      setSortBy={setSortBy}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
    />
  );

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => onRepositoryPress(item.id)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
      keyExtractor={item => item.id}
      ListHeaderComponent={renderHeader}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default RepositoryListContainer;