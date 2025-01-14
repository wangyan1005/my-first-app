import { View, TextInput } from 'react-native'
import React from 'react'

const Input = () => {
  const [text, setText] = React.useState('');
  return (
    <View>
      <TextInput 
        value={text} 
        onChangeText={(changeText) => setText(changeText)}
        placeholder="Type something"
      />
    </View>
  )
}

export default Input