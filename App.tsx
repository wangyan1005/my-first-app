import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import Header from './components/Header';

export default function App() {
  const [text, setText] = React.useState('');
  const appName = 'My First React Native App';

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header name={appName} />
      <TextInput 
        value={text} 
        onChangeText={(changeText) => setText(changeText)}
        placeholder="Type something"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
