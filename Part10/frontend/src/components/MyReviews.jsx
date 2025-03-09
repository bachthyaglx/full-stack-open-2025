// @ts-nocheck
import React from 'react';
import { FlatList, StyleSheet, View, Alert } from 'react-native';
import { useQuery, useMutation } from '@apollo/client';
import { ME } from '../graphql/queries';
import { DELETE_REVIEW } from '../graphql/mutations';
import Text from './Text';
import theme from '../theme';
import { format } from 'date-fns';
import { Button } from 'react-native-paper';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  reviewContainer: {
    backgroundColor: 'white',
    padding: 15,
  },
  reviewHeader: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  ratingContainer: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  ratingText: {
    color: theme.colors.primary,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
  },
  reviewInfo: {
    flex: 1,
  },
  repositoryName: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    marginBottom: 5,
  },
  date: {
    color: theme.colors.textSecondary,
    marginBottom: 5,
  },
  reviewText: {
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
  viewButton: {
    backgroundColor: theme.colors.primary,
  },
  deleteButton: {
    backgroundColor: theme.colors.error,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review, navigate, onDelete }) => {
  const { repository, rating, createdAt, text, id } = review.node;

  const handleDelete = () => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => onDelete(id),
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.reviewContainer}>
      <View style={styles.reviewHeader}>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{rating}</Text>
        </View>
        <View style={styles.reviewInfo}>
          <Text style={styles.repositoryName}>{repository.fullName}</Text>
          <Text style={styles.date}>
            {format(new Date(createdAt), 'dd.MM.yyyy')}
          </Text>
          <Text style={styles.reviewText}>{text}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          style={[styles.button, styles.viewButton]}
          onPress={() => navigate(`/repository/${repository.id}`)}
        >
          View repository
        </Button>
        <Button
          mode="contained"
          style={[styles.button, styles.deleteButton]}
          onPress={handleDelete}
        >
          Delete review
        </Button>
      </View>
    </View>
  );
};

const MyReviews = () => {
  const navigate = useNavigate();
  const { data, loading, error, refetch } = useQuery(ME, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  });

  const [deleteReview] = useMutation(DELETE_REVIEW, {
    onError: (error) => {
      console.log('Error deleting review:', error);
    },
  });

  if (loading) return null;
  if (error) return <Text>Error loading reviews</Text>;
  if (!data?.me?.reviews?.edges?.length) return <Text>No reviews yet</Text>;

  const reviews = data.me.reviews.edges;

  const handleDelete = (id) => {
    deleteReview({ variables: { id } });
    refetch();
  };

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <ReviewItem review={item} navigate={navigate} onDelete={handleDelete} />
      )}
      keyExtractor={({ node }) => node.id}
    />
  );
};

export default MyReviews;