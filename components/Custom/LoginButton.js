import React from 'react'
import { withNavigation } from 'react-navigation'
import CustomButton from './CustomButton'

function LoginButton(props) {
  return (
    <CustomButton {...props} onPress={() => props.navigation.navigate('Login')} />
  )
} 

export default withNavigation(LoginButton)