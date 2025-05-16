import { View, Text, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
//   itemContainer: {
//     padding: 15,
//     backgroundColor: '#fff',
//     borderRadius: 5,
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 2,
//   },
//   fullName: {
//     fontWeight: 'bold',
//     fontSize: 16,
//     marginTop: 8,
//   },
//   description: {
//     marginTop: 4,
//     fontSize: 14,
//     color: '#586069',
//   },
//   language: {
//     marginTop: 5,
//     color: '#0366d6',
//     fontWeight: 'bold',
//   },
//   avatar: {
//     width: 50,
//     height: 50,
//     borderRadius: 5,
//   },
});

const RepositoryItem = ({ item }) => (
  <View>
    {/* <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} /> */}
    <Text>Full name: {item.fullName}</Text>
    <Text>Description: {item.description}</Text>
    <Text>Language: {item.language}</Text>
    <Text>Stars: {item.stargazersCount}</Text>
    <Text>Forks: {item.forksCount}</Text>
    <Text>Reviews: {item.reviewCount}</Text>
    <Text>Rating: {item.ratingAverage}</Text>
  </View>
);

export default RepositoryItem;
