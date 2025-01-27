import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Goal } from '@/App'


interface GoalItemProps {
  goal: Goal
}

const GoalItem = ({ goal }: GoalItemProps) => {
  return (
    <View>
      <Text style={styles.slateBlue}>{goal.text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  slateBlue: {
    marginTop: 8,
    color: 'mediumslateblue',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    backgroundColor: 'bisque',
    borderRadius: 10,
  },
 })

export default GoalItem