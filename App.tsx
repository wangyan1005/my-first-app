import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import Header from './components/Header';
import Input from './components/Input';

export default function App() {
  const appName = 'My First React Native App';
  // define a state variable to store the data from Input component
  const [receivedData, setReceivedData] = React.useState('');

  // receive data from Input component
  function handleInputData(data: string) {
    // console.log('data received from Input component:', data)
    setReceivedData(data)
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header name={appName} />
      <Input focus={true} inputHandler={handleInputData} /> 
      <Text>{receivedData}</Text> 
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
