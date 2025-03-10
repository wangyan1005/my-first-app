import { Stack } from "expo-router";

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
          }}
        />
        <Stack.Screen 
          name="goals/[id]"
          options={{
            title: 'Goal Details', 
          }}
        />
      </Stack>
    </>
  )
}