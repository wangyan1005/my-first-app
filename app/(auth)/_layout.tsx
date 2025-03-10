import { Stack } from 'expo-router';
import React from 'react';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: '#ffffff',         // Text/icon color
        headerStyle: { backgroundColor: 'cornflowerblue' }, // Header background
      }}
    >
      {/* You can also define screen-specific options here */}
      <Stack.Screen name="login" options={{ title: 'Login' }} />
      <Stack.Screen name="signup" options={{ title: 'Signup' }} />
    </Stack>
  );
}