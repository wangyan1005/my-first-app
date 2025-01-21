import { View, TextInput, Text, Button, StyleSheet, Modal, Alert } from 'react-native'
import React from 'react'

interface InputProps {
  focus: boolean
  inputHandler: (data: string) => void
  visibility: boolean
  onDismiss: () => void
}

const Input = ({focus, inputHandler, visibility, onDismiss } : InputProps) => {
  const [text, setText] = React.useState('');
  const [isFocused, setIsFocused] = React.useState(true);

  function handleConfirm() {
    // console.log('user has typed in:', text)
    inputHandler(text)
  }

  function handleCancel() {
    Alert.alert('Confirm the Action', 'Decide to cancel?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      // the modal should be s=dismised
      {text: 'OK', onPress: () => onDismiss()},
    ]);
  }

 

  return (
    <Modal transparent={true} animationType='slide' visible={visibility}>
      <View style={styles.container}>
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.purple} 
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
          
          <View style={styles.buttonContainer}>
            <View style={styles.button} >
              <Button 
                title="Confirm" 
                onPress={handleConfirm} 
              />
            </View>
            <View style={styles.button} >
              <Button 
                title="Cancel" 
                onPress={handleCancel} 
              />
            </View>
          </View>
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
    padding: 20,
    borderRadius: 10,
    alignItems: 'center', 
  },
  purple: {
    height: 30,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'mediumpurple',
  },
  button: {
    width: '30%',
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

});


export default Input