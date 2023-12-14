import React, { useState } from 'react';
import { View } from "react-native";
import { TextInput,} from 'react-native';



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

export default Noter;