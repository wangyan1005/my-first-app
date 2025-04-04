// app/auth/signup.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/Firebase/firebaseSetup';

export default function SignupScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleSignup = async () => {
    if (email === '' || password === '' || confirm === '') {
        alert('Please fill in all fields');
        return;
    }
    // verify the email address
    // verify the password and comfirm password
    if (password !== confirm) {
        alert('Passwords do not match');
        return;
    }
    try {
        await createUserWithEmailAndPassword(auth, email, password)   
    }
    catch (e) {
        console.error('Error creating user:', e)
    }
    createUserWithEmailAndPassword(auth, email, password)
    
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirm}
        secureTextEntry
        onChangeText={setConfirm}
      />

      <Button title="Register" onPress={handleSignup} />

      <Button
        title="Already Registered? Login"
        onPress={() => router.replace('login')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  title: { fontSize: 18, marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    padding: 8,
    borderRadius: 4,
  },
});
