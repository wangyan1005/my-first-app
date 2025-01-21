import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button, SafeAreaView } from 'react-native';
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
    
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.topContainer}>
        <Header name={appName} />
        <Input 
          focus={true} 
          inputHandler={handleInputData} 
          visibility={isModalVisible}
          onDismiss={() => setIsModalVisible(false)} /> 
        <Button 
          title="Add a goal" onPress={() => setIsModalVisible(true)} />
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.slateBlue}>{receivedData}</Text> 
      </View> 
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  topContainer: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
  },
  bottomContainer: {
    flex: 4,
    backgroundColor: 'lightblue',
    alignItems: 'center',
  },
  slateBlue: {
    marginTop: 40,
    color: 'mediumslateblue',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
