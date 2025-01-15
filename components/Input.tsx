import { View, TextInput } from 'react-native'
import React from 'react'

interface InputProps {
  focus: boolean
}

const Input = ({focus} : InputProps) => {
  const [text, setText] = React.useState('');

  return (
    <View>
      <TextInput 
        value={text} 
        onChangeText={(changeText) => setText(changeText)}
        placeholder="Type something"
        autoFocus={focus}
      />
    </View>
  )
}

export default Input