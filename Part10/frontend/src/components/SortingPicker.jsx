import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Menu, Button } from 'react-native-paper';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: 'white',
  },
});

const SortingPicker = ({ selectedValue, onValueChange }) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const getButtonLabel = () => {
    switch (selectedValue) {
      case 'latest':
        return 'Latest repositories';
      case 'highest':
        return 'Highest rated repositories';
      case 'lowest':
        return 'Lowest rated repositories';
      default:
        return 'Latest repositories';
    }
  };

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Button
            mode="outlined"
            onPress={openMenu}
            style={styles.button}
          >
            {getButtonLabel()}
          </Button>
        }
      >
        <Menu.Item
          onPress={() => {
            onValueChange('latest');
            closeMenu();
          }}
          title="Latest repositories"
        />
        <Menu.Item
          onPress={() => {
            onValueChange('highest');
            closeMenu();
          }}
          title="Highest rated repositories"
        />
        <Menu.Item
          onPress={() => {
            onValueChange('lowest');
            closeMenu();
          }}
          title="Lowest rated repositories"
        />
      </Menu>
    </View>
  );
};

export default SortingPicker;