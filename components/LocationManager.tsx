import { View, Text, Button, Alert, Image } from 'react-native'
import React, { useEffect } from 'react'
import * as Location from 'expo-location';
import { useState } from 'react';
import {router, useLocalSearchParams, usePathname} from 'expo-router';
import { readDocFromDB, writeToDB } from '@/Firebase/firestoreHelper';
import { auth } from '@/Firebase/firebaseSetup';

export interface locationData {
    latitude: number;
    longitude: number;
  }

export default function LocationManager() {
  const { latitude, longitude } = useLocalSearchParams();
  
  const [response, requestPermission] = Location.useForegroundPermissions();
  const [location, setLocation] = useState<locationData | null>(null);

  useEffect(() => {
    if (latitude && longitude) {
      setLocation({
        latitude: Array.isArray(latitude) ? parseFloat(latitude[0]) : parseFloat(latitude),
        longitude: Array.isArray(longitude) ? parseFloat(longitude[0]) : parseFloat(longitude)
      });
    }
  }, [latitude, longitude]);

  useEffect(() => {
    async function fetchUserdata() {
      try {
        if (auth.currentUser?.uid) {
          const data = await readDocFromDB(auth.currentUser?.uid, 'users');
            if (data?.location) {
              setLocation({
                latitude: data.location.latitude,
                longitude: data.location.longitude
              });
            }
          } 
        } catch (e) {
          console.error('Error getting location:', e)
        }
    }
    fetchUserdata();
  })

  async function verifyPermissions() {
    try {
       if (response?.status === 'granted') {
        return true;
        }
        const reponseFromUser = await requestPermission();
        return reponseFromUser.granted;
    } catch (e) {
        console.error('Error getting location permissions:', e)
    }
  }

  async function handleLocation() {
    try {
      const hasPermission = await verifyPermissions();
      if (!hasPermission) {
        Alert.alert('You need to grant location permissions to use this app.');
        return;
     }

      const location = await Location.getCurrentPositionAsync();
      console.log(location);
      setLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        });
  
    }
    catch (e) {
      console.error('Error getting location:', e)
    }
    
  }

  function chooseLocationHanlder() {
    if (location) {
      router.navigate({
        pathname: 'map',
        params: {
          latitude: location.latitude,
          longitude: location.longitude
        }
     });
    }}

  return (
    <View>
      <Button title="find my location" onPress={handleLocation} />
      <Button title="choose an map" onPress={chooseLocationHanlder} />
      <View style={{justifyContent: "center", alignItems: 'center'}}>
        {location && <Image 
          source={{ uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location?.latitude},${location?.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location?.latitude},${location?.longitude}&key=AIzaSyAtLtdEnSQqCxleOlrkBvnGJcDPoYr8yGc` }} 
          style={{ width: 300, height: 200}} />
        }
        <Button title="save to Firebase" onPress={async () => {
          if (location) {
            await writeToDB({location}, 'users', auth.currentUser?.uid);
          } else {
            Alert.alert('Location is not available.');
          }
        }} />

        </View>
    </View>
  )
}