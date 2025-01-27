import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button, SafeAreaView, ScrollView, FlatList} from 'react-native';
import React from 'react';
import Header from './components/Header';
import Input from './components/Input';

interface Goal {
  id: number;
  text: string;
}

export default function App() {
  const appName = 'My First React Native App';
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
       <FlatList 
       contentContainerStyle={styles.centerHorizontal}
        data={goals}
        renderItem={({item}) => (
          <View>
            <Text style={styles.slateBlue}>{item.text}</Text>
          </View>
        )}
      />
      {/* <ScrollView contentContainerStyle={styles.centerHorizontal}>
        {goals.map((goal) => {
          return (
          <View key={goal.id}>
            <Text style={styles.slateBlue}>{goal.text}</Text>
          </View>
         )}
        )}
      </ScrollView> */}
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
    // alignItems: 'center',
  },
  slateBlue: {
    marginTop: 8,
    color: 'mediumslateblue',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    backgroundColor: 'bisque',
    borderRadius: 10,
  },
  centerHorizontal: {
    alignItems: 'center',
  },

});
