import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button, SafeAreaView, FlatList, Alert} from 'react-native';
import React from 'react';
import Header from './components/Header';
import Input from './components/Input';
import GoalItem from './components/GoalItem';

export interface Goal {
  id: number;
  text: string;
}

export default function App() {
  const appName = 'My First React Native App';
  const[isModalVisible, setIsModalVisible] = React.useState(false);
  const [goals, setGoals] = React.useState<Goal[]>([]);

  function handleDeleteGoal(deleteId: number) {
    // console.log('delete id:', deleteId)
    setGoals((prevGoals) => {
      return prevGoals.filter((goal) => goal.id !== deleteId)
    })
  }

  // receive data from Input component
  function handleInputData(data: string) {
    // add the object to the goals array
    let newGoal: Goal = {
      id: Math.random(),
      text: data,
    }
    setGoals((currGoals) => [...currGoals, newGoal])
    setIsModalVisible(false)
  }

  function handleDeleteAll() {
    Alert.alert('Delete All Goals', 
      'Are you sure you want to delete all goals?', [
      {text: 'no', style: 'cancel'},
      {text: 'yes', onPress: () => setGoals([])}
    ])
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
          <GoalItem goal={item} deletehandler={handleDeleteGoal} />  
        )}
        ListEmptyComponent={
          <Text style={styles.title}>No goals to show</Text>
        }
        ListHeaderComponent={goals.length > 0 ? ( 
          <Text style={styles.title}>My Goals</Text>) : null
        }
        ListFooterComponent={goals.length > 0 ? (
          <Button 
            title='Delete All'
            onPress={handleDeleteAll}
          />
        ) : null}
        ItemSeparatorComponent={() => (
          <View style={styles.separator} />
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
  centerHorizontal: {
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'mediumslateblue',
    marginVertical: 10,
  },
  separator: {
    height: 3,
    backgroundColor: 'grey',
    marginVertical: 5, 
  },
});
