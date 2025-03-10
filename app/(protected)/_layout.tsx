import { Stack } from "expo-router";
import PressableButton from "@/components/PressableButton";
import Ionicons from '@expo/vector-icons/Ionicons';
import {router} from 'expo-router';
import { signOut } from "firebase/auth";
import { auth } from "@/Firebase/firebaseSetup";

export default function Layout() {
  return (
    <>
      <Stack screenOptions={{ 
        headerStyle: {
          backgroundColor: 'cornflowerblue',
        },
        headerTintColor: 'white'
      }}>
        <Stack.Screen 
          name="index" 
          options={{
            headerTitle: 'All My Goals', 
            headerRight: () => (
              <PressableButton  
              pressedHandler={() => router.navigate('/(protected)/profile')}
              pressedStyle={{backgroundColor: 'blue'}}
              componentStyle={{backgroundColor: 'cornflowerblue', marginRight: 10}}
            >
            <Ionicons name="person-circle-outline" size={24} color="black"  />
           
            </PressableButton>
            )
          }}
        />
        <Stack.Screen 
          name="goals/[id]"
          options={{
            title: 'Goal Details', 
          }}
        />
        <Stack.Screen 
          name="profile"
          options={{
            title: 'Profile', 
            headerRight: () => (
              <PressableButton  
                pressedHandler={() => signOut(auth)}
                pressedStyle={{backgroundColor: 'blue'}}
                componentStyle={{backgroundColor: 'cornflowerblue', marginRight: 10}}
              >
              <Ionicons name="log-out-outline" size={24} color="black"  /> 
              </PressableButton>
            )
          }}
        />
      </Stack>
    </>
  )
}