import { View, Text, Button, Alert } from 'react-native'
import React from 'react'
import { getPermissionsAsync, requestPermissionsAsync, SchedulableTriggerInputTypes, scheduleNotificationAsync } from 'expo-notifications'

export default function NotificationManager() {
    
    async function allowsNotificationsAsync() {
        try {
            const permissions = await getPermissionsAsync();
            if (permissions.status !== 'granted') {
                const { status } = await requestPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Permission denied', 'You must enable notifications in your settings');
                    return false;
                }
            }
            return true;
        } catch (e) {
            console.error('Error getting location permissions:', e)
        }
      }
   
    async function scheduleNotificationHandler() {
      try {
        const permissions = await allowsNotificationsAsync();
        if (!permissions) {
            return;
        }

        await scheduleNotificationAsync({
        content: {
          title: 'daily notification',
          body: "don't forget to add your daily goals",
        },
        trigger: {
         seconds: 10,
          type: SchedulableTriggerInputTypes.TIME_INTERVAL,
        },
      });
      } catch (e) {
        console.error('Error scheduling notification:', e);
    }
}
   
  return (
    <View>
      <Button title="Schedule Notification" onPress={scheduleNotificationHandler}/>
    </View>
  )
}