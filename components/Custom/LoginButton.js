import React from 'react'
import { Button } from 'react-native'
import { withNavigation } from 'react-navigation'

function LoginButton(props) {
  return (
    <Button {...props} onPress={() => props.navigation.navigate('Login')} />
  )
} 

export default withNavigation(LoginButton)