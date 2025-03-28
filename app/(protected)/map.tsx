import React from 'react'
import MapView, { Marker } from "react-native-maps";
import { locationData } from '@/components/LocationManager'
import { Button } from 'react-native'
import {router} from 'expo-router';

export default function map() {
  const [selectedLocation, setSelectedLocation] = React.useState<locationData | null>(null);

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