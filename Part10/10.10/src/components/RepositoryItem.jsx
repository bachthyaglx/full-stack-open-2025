import { View, Text, Image, StyleSheet } from 'react-native';
import theme from '../theme';
import RepositoryStats from './RepositoryStats';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  topContainer: {
    flexDirection: 'row',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5
  },
  itemRight: {
    flex: 1,
    paddingLeft: 15,
  },
  infoContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  fullName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: theme.colors.textPrimary,
  },
  description: {
    marginTop: 4,
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  language: {
    marginTop: 8,
    alignSelf: 'flex-start',
    paddingVertical: 7,
    paddingHorizontal: 7,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
    color: 'white',
    overflow: 'hidden',
  },
});

const RepositoryItem = ({ item }) => (
  <View style={styles.container}>
    <View style={{ flexDirection: 'row' }}>
      <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
      <View style={styles.itemRight}>
        <Text style={styles.fullName}>{item.fullName}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <View style={{ marginTop: 5 }}>
          <Text style={styles.language}>{item.language}</Text>
        </View>
      </View>
    </View>
    <RepositoryStats item={item} />
  </View>
);

export default RepositoryItem;
