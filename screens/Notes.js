import React, { useState } from 'react';
import { View } from "react-native";
import { TextInput,} from 'react-native';
import {AsyncStorage} from 'react-native';
//can delete thisVVV
_retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem('SaveData');
    if (value !== null) {
      newTest = text
    }
  } catch (error) {
  }
};
//^^^^
const Noter = () => {
  const [text, setText] = useState('');
  return (
    <View >
      <TextInput
        style={{height: 100}}
        placeholder="type your shopping list"
        onChangeText={newText => setText(newText)}
        defaultValue={text}
      />
      
      
    </View>
  );
};
//can delete this vvvv
_storeData = async () => {
  try {
    await AsyncStorage.setItem(
      'SaveData',
      text,
    );
  } catch (error) {
  }
};
// ^^^^^
export default Noter;