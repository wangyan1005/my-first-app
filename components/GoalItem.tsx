import { View, Text, StyleSheet, Button, Pressable} from 'react-native'
import { useRouter } from 'expo-router'
import React from 'react'
import { GoalDB } from '@/app'

interface GoalItemProps {
  goal: GoalDB
  deletehandler: (deleteId: string) => void
}

const GoalItem = ({ goal, deletehandler }: GoalItemProps) => {
  const router = useRouter();

  return (
    <Pressable 
      style={styles.container}
      onPress={() => router.navigate(`/goals/${goal.id}`)}
      >
      <Text style={styles.slateBlue}>{goal.text}</Text>
      {/* <Button title="info" onPress={() => router.navigate(`/goals/${goal.id}`)} /> */}
      <Button title="x" onPress={() => deletehandler(goal.id)} />
      {/* <Link href={`/goals/${goal.id}`}> info </Link> */}  
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'bisque',
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  slateBlue: {
    color: 'mediumslateblue',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    marginRight: 10,
  },
 })

export default GoalItem