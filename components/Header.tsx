import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

// type HeaderProps = { name: string }
interface HeaderProps {
    name: string
    }

const Header = ({ name }: HeaderProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.purple} >Welcome to {name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderWidth: 3,
    borderColor: 'mediumpurple',
    padding: 10,
  },
  purple: {
    color: 'mediumpurple',
    fontSize: 20,
    fontWeight: 'bold',
  },
})

export default Header


