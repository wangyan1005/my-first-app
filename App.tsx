import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import React from 'react';
import Header from './components/Header';
import Input from './components/Input';

export default function App() {
  const appName = 'My First React Native App';

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header name={appName} />
      <Input focus={true} />   
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
