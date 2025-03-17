import { View, Text, Button, Alert, Image} from 'react-native'
import React from 'react'
import * as ImagePicker from 'expo-image-picker';

interface ImageManagerProps {
    imageUriHandler: (imageUri: string) => void
}

export default function ImageManager({imageUriHandler}: ImageManagerProps) {
  const [ response,requestPermission ] = ImagePicker.useCameraPermissions();
  const [imageUri, setImageUri] = React.useState<string | null>(null);
  
  async function verifyPermissions() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
        alert('Sorry, we need camera permissions to make this work!');
        return false;
    }
    requestPermission();
    return true;

   }
    
  async function takeImageHandler() {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      Alert.alert('You need to grant camera permissions to use this app.');
      return;
    }
    try {
      const result = await ImagePicker.launchCameraAsync({ allowsEditing: true }); 
      if (!result.canceled) { 
        setImageUri(result.assets[0].uri);
        imageUriHandler(result.assets[0].uri);
      }
    }
    catch (error) {
      console.log('error:', error)
    }
}

  return (
    <View>
      <Button title="Take an Image" onPress={takeImageHandler} />
      {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />}
    </View>
  )

}


