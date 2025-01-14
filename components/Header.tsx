import { View, Text } from 'react-native'
import React from 'react'

// type HeaderProps = { name: string }
interface HeaderProps {
    name: string
    }

const Header = ({ name }: HeaderProps) => {
  return (
    <View>
      <Text >Welcome to {name}</Text>
    </View>
  )
}

export default Header


