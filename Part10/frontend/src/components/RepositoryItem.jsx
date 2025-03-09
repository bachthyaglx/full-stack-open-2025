// @ts-nocheck
import React from 'react';
import { View, Image, Text, StyleSheet, Pressable, Linking } from 'react-native';
import theme from '../theme';

const formatCount = (count) => {
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'k';
  }
  return count.toString();
};

const RepositoryItemHeader = ({ item }) => (
  <View style={styles.headerContainer}>
    <Image source={{ uri: item.ownerAvatarUrl }} style={styles.avatar} />
    <View style={styles.headerInfo}>
      <Text style={styles.fullName}>{item.fullName}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.languageContainer}>
        <Text style={styles.language}>{item.language}</Text>
      </View>
    </View>
  </View>
);

const StatItem = ({ label, value }) => (
  <View style={styles.statItem}>
    <Text style={styles.statValue}>{formatCount(value)}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const RepositoryStats = ({ item }) => (
  <View style={styles.stats}>
    <StatItem label="Stars" value={item.stargazersCount} />
    <StatItem label="Forks" value={item.forksCount} />
    <StatItem label="Reviews" value={item.reviewCount} />
    <StatItem label="Rating" value={item.ratingAverage} />
  </View>
);

const GitHubButton = ({ url }) => (
  <Pressable
    style={styles.githubButton}
    onPress={() => Linking.openURL(url)}
  >
    <Text style={styles.githubButtonText}>Open in GitHub</Text>
  </Pressable>
);

const RepositoryItem = ({ item, showGitHubLink }) => {
  return (
    <View testID="repositoryItem" style={styles.container}>
      <RepositoryItemHeader item={item} />
      <RepositoryStats item={item} />
      {showGitHubLink && <GitHubButton url={item.url} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.padding.large,
    backgroundColor: theme.colors.white,
  },
  headerContainer: {
    flexDirection: 'row',
    marginBottom: theme.margins.medium,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: theme.roundness,
  },
  headerInfo: {
    flex: 1,
    marginLeft: theme.margins.medium,
  },
  fullName: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
  },
  description: {
    color: theme.colors.textSecondary,
    marginTop: theme.margins.small,
  },
  languageContainer: {
    marginTop: theme.margins.small,
  },
  language: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    padding: theme.padding.small,
    borderRadius: theme.roundness,
    alignSelf: 'flex-start',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: theme.margins.medium,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontWeight: theme.fontWeights.bold,
  },
  statLabel: {
    color: theme.colors.textSecondary,
  },
  githubButton: {
    backgroundColor: theme.colors.primary,
    padding: theme.padding.medium,
    borderRadius: theme.roundness,
    marginTop: theme.margins.medium,
    alignItems: 'center',
  },
  githubButtonText: {
    color: theme.colors.white,
    fontWeight: theme.fontWeights.bold,
  },
});

export default RepositoryItem;