import { StyleSheet, Text, View, StyleProp, ViewStyle, Pressable } from 'react-native'
import React from 'react'

interface PressableButtonProps {
    pressedHandler: () => void;
    pressedStyle?: StyleProp<ViewStyle>;
    children: React.ReactNode;
    componentStyle?: StyleProp<ViewStyle>;
}

export default function PressableButton({
    children,
    pressedHandler,
    pressedStyle,
}: PressableButtonProps) {
  return (
    <Pressable 
      onPress={pressedHandler} 
      style={({pressed}) => (
        [styles.defaultStyle, 
        pressed && styles.defaultPressedStyle,
        pressed && pressedStyle])}>
      <View>{children}</View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  defaultStyle: {
    backgroundColor: 'azure',
    height: 30,
    justifyContent: 'center',
   
  },
  defaultPressedStyle: {
    opacity: 0.5,
},
})