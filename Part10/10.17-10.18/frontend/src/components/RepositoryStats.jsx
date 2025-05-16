import { View, StyleSheet } from 'react-native';
import Text from '../Text'

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Ensure equal spacing
    alignItems: 'center', // Align with the image
    marginTop: 15,
    flex: 1, // Allow it to stretch based on available space
  },
  statCount: {
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#586069',
  },
});

const formatCount = (count) => (count >= 1000 ? `${(count / 1000).toFixed(1)}k` : String(count));

const RepositoryStats = ({ item }) => (
  <View style={styles.statsContainer}>
    <View >
      <Text style={styles.statCount}>{formatCount(item.stargazersCount)}</Text>
      <Text style={styles.statLabel}>Stars</Text>
    </View>
    <View >
      <Text style={styles.statCount}>{formatCount(item.forksCount)}</Text>
      <Text style={styles.statLabel}>Forks</Text>
    </View>
    <View >
      <Text style={styles.statCount}>{item.reviewCount}</Text>
      <Text style={styles.statLabel}>Reviews</Text>
    </View>
    <View >
      <Text style={styles.statCount}>{item.ratingAverage}</Text>
      <Text style={styles.statLabel}>Rating</Text>
    </View>
  </View>
);

export default RepositoryStats;
