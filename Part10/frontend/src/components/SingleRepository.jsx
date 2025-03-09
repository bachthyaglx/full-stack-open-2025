import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useParams } from 'react-router-native';
import RepositoryInfo from './RepositoryInfo';
import ReviewItem from './ReviewItem';
import useRepository from '../hooks/useRepository';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, fetchMore, loading } = useRepository({
    id,
    first: 4,  // Start with a small number for testing
  });

  if (loading) return null;

  const reviews = repository?.reviews.edges || [];

  const onEndReach = () => {
    console.log('End reached, fetching more reviews...');
    fetchMore();
  };

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ node }) => node.id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;