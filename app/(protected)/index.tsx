import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button, SafeAreaView, FlatList, Alert, Pressable} from 'react-native';
import React, { useEffect } from 'react';
import Header from '../../components/Header';
import Input from '../../components/Input';
import GoalItem from '../../components/GoalItem';
import { auth, database } from '../../Firebase/firebaseSetup';
import { deleteFromDB, writeToDB } from '../../Firebase/firestoreHelper';
import {goalData} from '../../Firebase/firestoreHelper';
import { onSnapshot, collection} from 'firebase/firestore';
import PressableButton from '../../components/PressableButton';
import { deleteAllFromDB } from '../../Firebase/firestoreHelper';
import { where, query } from 'firebase/firestore';
import { ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../Firebase/firebaseSetup';


export interface GoalDB extends goalData {
  id: string;
}

export interface userInput {
  text: string;
  imageUri: string | null;
}

export default function App() {
  // console.log(database)
  const appName = 'My First React Native App';
  const[isModalVisible, setIsModalVisible] = React.useState(false);
  const [goals, setGoals] = React.useState<GoalDB[]>([]);
  
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(database, 'goals'), 
        where("owner", "==", auth.currentUser?.uid || 'null' )
      ), 
      (querySnapshot) => {
        if (querySnapshot.empty) {
          setGoals([]);
        } else {
          let newArrayOfGoals: GoalDB[] = [];
          querySnapshot.forEach((docSnapshot) => {
            newArrayOfGoals.push({
              ...(docSnapshot.data() as goalData),
              id: docSnapshot.id,
            });
          });
          setGoals(newArrayOfGoals);
        }
      }
    );
  
      return () => {
        unsubscribe();
      };
    }, []);
    

  function handleDeleteGoal(deleteId: string) {
    deleteFromDB(deleteId, 'goals')
    // console.log('delete id:', deleteId)
    setGoals((prevGoals) => {
      return prevGoals.filter((goal) => goal.id !== deleteId)
    })
  }

  async function fetchImage(uri: string) {
    try {
      const response = await fetch(uri) 
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const blob = await response.blob();
      const imageName = uri.substring(uri.lastIndexOf('/') + 1);
      const imageRef = ref(storage, `images/${imageName}`)
      const uploadResult = await uploadBytesResumable(imageRef, blob);
      return uploadResult.metadata.fullPath
    }
    catch (e) {
      console.error('Error fetching image:', e)
    }
  }


  // receive data from Input component
  async function handleInputData(data: userInput) {
    console.log('user has entered in:', data)
    let storgeImageUri = null
    if (data.imageUri) {
      const uri =  await fetchImage(data.imageUri)
      if (uri) {
        storgeImageUri = uri
    }
    // add the object to the goals array
    let newGoal: goalData = {
      text: data.text,
      owner: auth.currentUser? auth.currentUser.uid : 'null',
      imageUri: storgeImageUri,
    }
    
    writeToDB(newGoal, 'goals')

    // setGoals((currGoals) => [...currGoals, newGoal])
    setIsModalVisible(false)
  }
}

  function handleDeleteAll() {
    Alert.alert('Delete All Goals', 
      'Are you sure you want to delete all goals?', [
      {text: 'no', style: 'cancel'},
      {text: 'yes', onPress: () => deleteAllFromDB('goals')}
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
          <PressableButton
            pressedHandler={() => setIsModalVisible(true)}
            pressedStyle={styles.pressed}
            componentStyle={styles.defaultStyle}
          >
            <Text style={styles.text}>Add a goal</Text>
          </PressableButton> 
         {/* <Button 
          title="Add a goal" onPress={() => setIsModalVisible(true)} />  */}
      </View>
      <View style={styles.bottomContainer}>
       <FlatList 
        contentContainerStyle={styles.centerHorizontal}
        data={goals}
        renderItem={({item, separators}) => (
          <GoalItem 
            goal={item} 
            deletehandler={handleDeleteGoal}
            pressedInHandler={() => separators.highlight()}
            pressedOutHandler={() => separators.unhighlight()}
          />  
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
        ItemSeparatorComponent={({ highlighted }) => (
          <View style={[styles.separator, highlighted && styles.highlightedSeparator]} />
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
    // marginTop: 50,
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
  pressed: {
    backgroundColor: 'darksalmon',
    opacity: 0.5,
  },
  text: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    
  },
  defaultStyle: {
    padding: 10,
    borderRadius: 10,
  },
  highlightedSeparator: {
    backgroundColor: 'dodgerblue',
  }
});
