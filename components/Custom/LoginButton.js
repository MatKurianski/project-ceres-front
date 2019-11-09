import React from 'react'
import { Button } from 'react-native'

export default function LoginButton(props) {
  return (
    <Button {...props} onPress={() => props.navigation.navigate('Login')} />
  )
} 