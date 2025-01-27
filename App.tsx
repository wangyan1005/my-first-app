import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button, SafeAreaView } from 'react-native';
import React from 'react';
import Header from './components/Header';
import Input from './components/Input';

interface Goal {
  id: number;
  text: string;
}

export default function App() {
  const appName = 'My First React Native App';
  // define a state variable to store the data from Input component
  const [receivedData, setReceivedData] = React.useState('');
  const[isModalVisible, setIsModalVisible] = React.useState(false);
  const [goals, setGoals] = React.useState<Goal[]>([]);

  // receive data from Input component
  function handleInputData(data: string) {
    // console.log('data received from Input component:', data)
    // setReceivedData(data)
    // add the object to the goals array
    let newGoal: Goal = {
      id: Math.random(),
      text: data,
    }
    setGoals((currGoals) => [...currGoals, newGoal])
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
         {receivedData && <Text style={styles.slateBlue}>{receivedData}</Text>}  
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
    marginTop: 50,
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
    marginTop: 8,
    color: 'mediumslateblue',
    fontSize: 15,
    fontWeight: 'bold',
    padding: 5,
    backgroundColor: 'bisque',
    borderRadius: 10,
  },

});
