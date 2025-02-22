import { Text, StyleSheet, Pressable, Alert} from 'react-native'
import { useRouter } from 'expo-router'
import React from 'react'
import { GoalDB } from '@/app'
import PressableButton from './PressableButton'
import Ionicons from '@expo/vector-icons/Ionicons';

interface GoalItemProps {
  goal: GoalDB
  deletehandler: (deleteId: string) => void
  pressedInHandler: () => void
  pressedOutHandler: () => void
}

const GoalItem = ({ goal, deletehandler, pressedInHandler, pressedOutHandler }: GoalItemProps) => {
  const router = useRouter();

  function handleLongPress() {
    Alert.alert(
      'Delete',
      'Are you sure you want to delete this goal?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => deletehandler(goal.id),
        },
      ],
    );
  };

  return (
    <Pressable
      android_ripple={styles.androidStyle} 
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={() => router.navigate(`/goals/${goal.id}`)}
      onLongPress={handleLongPress}
      onPressIn={pressedInHandler}
      onPressOut={pressedOutHandler}
    >
      <Text style={styles.slateBlue}>{goal.text}</Text>
      <PressableButton  
        pressedHandler={() => deletehandler(goal.id)}
        pressedStyle={styles.pressed}
        componentStyle={styles.defaultStyle}
      >
      <Ionicons name="trash" size={22} color="black" />
      {/* <Button title="info" onPress={() => router.navigate(`/goals/${goal.id}`)} /> */}
      {/* <Button title="x" onPress={() => deletehandler(goal.id)} /> */}
      {/* <Link href={`/goals/${goal.id}`}> info </Link> */} 
      </PressableButton> 
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'bisque',
    marginVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
    height: 50,
    width: '35%',
  },
  slateBlue: {
    color: 'mediumslateblue',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    marginRight: 10,
  },
  pressed: {
    backgroundColor: 'darksalmon',
    opacity: 0.5,
  },
  androidStyle: {
    color: 'grey',
  },
  defaultStyle: {
    backgroundColor: 'bisque',
    padding: 5,

  },
 })

export default GoalItem