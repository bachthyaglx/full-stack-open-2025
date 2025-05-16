import { FlatList, View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

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
      /* Other properties */
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <RepositoryItem item={item} />}
    />
  );
};

export default RepositoryList;
