import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';
import SortingPicker from './SortingPicker';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  searchbar: {
    margin: 15,
  },
});

const RepositoryListHeader = ({ sortBy, setSortBy, searchQuery, setSearchQuery }) => {
  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search repositories..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />
      <SortingPicker
        selectedValue={sortBy}
        onValueChange={setSortBy}
      />
    </View>
  );
};

export default RepositoryListHeader;