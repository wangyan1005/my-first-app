import { View, TextInput, Text, Button, StyleSheet, Modal } from 'react-native'
import React from 'react'

interface InputProps {
  focus: boolean
  inputHandler: (data: string) => void
  visibility: boolean
}

const Input = ({focus, inputHandler, visibility} : InputProps) => {
  const [text, setText] = React.useState('');
  const [isFocused, setIsFocused] = React.useState(true);

  function handleConfirm() {
    // console.log('user has typed in:', text)
    inputHandler(text)
  }

 

  return (
    <Modal transparent={true} animationType='slide' visible={visibility}>
    <View style={styles.container}>
      <View style={styles.modalContainer}>
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
      
      <Button 
        title="confirm" 
        onPress={handleConfirm} 
      /> 
      </View>
    </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 10,
  }
});


export default Input