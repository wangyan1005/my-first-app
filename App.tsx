import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button } from 'react-native';
import React from 'react';
import Header from './components/Header';
import Input from './components/Input';

export default function App() {
  const appName = 'My First React Native App';
  // define a state variable to store the data from Input component
  const [receivedData, setReceivedData] = React.useState('');
  const[isModalVisible, setIsModalVisible] = React.useState(false);

  // receive data from Input component
  function handleInputData(data: string) {
    // console.log('data received from Input component:', data)
    setReceivedData(data)
    setIsModalVisible(false)
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header name={appName} />
      <Input focus={true} inputHandler={handleInputData} visibility={isModalVisible} /> 
      <Button title="Add a goal" onPress={() => setIsModalVisible(true)} />
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
