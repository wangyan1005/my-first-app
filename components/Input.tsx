import { View, TextInput, Text } from 'react-native'
import React from 'react'

interface InputProps {
  focus: boolean
}

const Input = ({focus} : InputProps) => {
  const [text, setText] = React.useState('');
  const [isFocused, setIsFocused] = React.useState(true);

  return (
    <View>
      <TextInput 
        value={text} 
        onChangeText={(changeText) => setText(changeText)}
        placeholder="Type something"
        autoFocus={focus}
        onEndEditing={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
      />

      {text && isFocused &&
        <Text>Count: {text.length}</Text>
      }

      {!isFocused && text.length >= 3 && 
        <Text>Thank you</Text>
      }

      {!isFocused && text.length < 3 && 
        <Text>Please type more than 3 characters</Text>
      }
    </View>
  )
}

export default Input