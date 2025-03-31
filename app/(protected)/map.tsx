import React, { useEffect, useRef } from 'react'
import MapView, { Marker } from "react-native-maps";
import { locationData } from '@/components/LocationManager'
import { Button } from 'react-native'
import {router} from 'expo-router';
import { useLocalSearchParams } from 'expo-router';


export default function map() {
  const {latitude, longitude} = useLocalSearchParams();
  const [selectedLocation, setSelectedLocation] = React.useState<locationData | null>(null);
 

  useEffect(() => {
    if (latitude && longitude) {
      const newLat = Array.isArray(latitude) ? parseFloat(latitude[0]) : parseFloat(latitude);
      const newLng = Array.isArray(longitude) ? parseFloat(longitude[0]) : parseFloat(longitude);
  
      setSelectedLocation((prevLocation) => {
        // Only update if coordinates actually changed
        if (!prevLocation || prevLocation.latitude !== newLat || prevLocation.longitude !== newLng) {
          return { latitude: newLat, longitude: newLng };
        }
        return prevLocation; // otherwise do nothing
      });
    }
  }, [latitude, longitude]);

  function confirmHandler() {
    router.navigate({
      pathname: '/(protected)/profile',
      params: {
        latitude: selectedLocation?.latitude, 
        longitude: selectedLocation?.longitude
      }
    })
  }
  return (
    <>
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      onPress = {(e) => {
        setSelectedLocation({
          latitude: e.nativeEvent.coordinate.latitude,
          longitude: e.nativeEvent.coordinate.longitude
        })  
      }}
    >
    {selectedLocation && <Marker coordinate={selectedLocation} />}
    </MapView>
    <Button 
      title="confirm location" 
      disabled={!selectedLocation}
      onPress={confirmHandler} />  
 </>
  )
}