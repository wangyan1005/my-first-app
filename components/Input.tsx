import { View, TextInput, Text, Button, StyleSheet, Modal, Alert, Image } from 'react-native'
import React from 'react'
import ImageManager from './ImageManager'

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
    setText('')
  }

  function handleCancel() {
    Alert.alert('Confirm the Action', 'wish to type again? click "Cancel"\nstop typing? click "OK"', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      // the modal should be dismissed
      {text: 'OK', onPress: () => onDismiss()},
    ]);
    setText('')
  }

  return (
    <Modal transparent={true} animationType='slide' visible={visibility}>
      <View style={styles.container}>
        <View style={styles.modalContainer}>
          <Image
            style={styles.logo}
            source={require('../logo.png')}
            alt = "local logo picture"
          />
          <Image
            style={styles.logo}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/2617/2617812.png',
            }}
            alt = "remote logo picture"
          />
          <TextInput
            style={styles.purple} 
            value={text} 
            onChangeText={(changeText) => setText(changeText)}
            placeholder="Type something"
            autoFocus={focus}
            onEndEditing={() => setIsFocused(false)}
            onFocus={() => setIsFocused(true)}
          />
          <ImageManager />

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
                title="Cancel" 
                onPress={handleCancel} 
              />
            </View>
            <View style={styles.button} >
              <Button 
                title="Confirm" 
                onPress={handleConfirm} 
                disabled={text.length < 3}
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
    padding: 5,
    marginTop: 15,
    marginBottom: 10,
  },
  button: {
    width: '30%',
    marginTop: 5,
    marginHorizontal: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  logo: {
    width: 100,
    height: 100,
  }

});


export default Input