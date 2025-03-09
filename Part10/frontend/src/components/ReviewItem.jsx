// @ts-nocheck
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';
import { format } from 'date-fns';

const styles = StyleSheet.create({
  container: {
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
  username: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    marginBottom: 5,
  },
  date: {
    color: theme.colors.textSecondary,
    marginBottom: 5,
  },
});

const ReviewItem = ({ review }) => {
  const { node } = review;
  const { rating, createdAt, text, user } = node;

  return (
    <View style={styles.container}>
      <View style={styles.reviewHeader}>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{rating}</Text>
        </View>
        <View style={styles.reviewInfo}>
          <Text style={styles.username}>{user.username}</Text>
          <Text style={styles.date}>
            {format(new Date(createdAt), 'dd.MM.yyyy')}
          </Text>
          <Text>{text}</Text>
        </View>
      </View>
    </View>
  );
};

export default ReviewItem;