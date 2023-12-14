import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { CheckBox, Text, Icon } from 'react-native-elements';

const ShoppingList = () => {
  const [text, setText] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [items, setItems] = useState([]);

  const handleAddItem = () => {
    if (text.trim() !== '') {
      setItems([...items, { text, isChecked }]);
      setText('');
      setIsChecked(false);
    }
  };

  const handleCheckboxChange = (index) => {
    const updatedItems = [...items];
    updatedItems[index].isChecked = !updatedItems[index].isChecked;
    setItems(updatedItems);
  };

  const handleDeleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add item"
        value={text}
        onChangeText={(value) => setText(value)}
      />
      <View style={styles.checkboxContainer}>
      </View>
      <Button title="Add" onPress={handleAddItem} />

      {items.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          <CheckBox
            checked={item.isChecked}
            onPress={() => handleCheckboxChange(index)}
          />
          <Text>{item.text}</Text>
          <Icon
            name="delete"
            type="material"
            color="red"
            onPress={() => handleDeleteItem(index)}
          />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
});

export default ShoppingList;