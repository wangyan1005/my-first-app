import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'
import { GoalDB } from '@/App'

interface GoalItemProps {
  goal: GoalDB
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