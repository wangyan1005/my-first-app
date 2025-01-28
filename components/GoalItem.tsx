import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'
import { Goal } from '@/App'

interface GoalItemProps {
  goal: Goal
  deletehandler: (deleteId: number) => void
}

const GoalItem = ({ goal, deletehandler }: GoalItemProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.slateBlue}>{goal.text}</Text>
      <Button title="x" onPress={() => deletehandler(goal.id)} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'bisque',
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 10,
  },
  slateBlue: {
    color: 'mediumslateblue',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
 })

export default GoalItem