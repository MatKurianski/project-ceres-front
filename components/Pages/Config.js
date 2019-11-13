import React from 'react'
import { View } from 'react-native'
import CustomText from './../Custom/CustomText'

export default function Config() {
  return (
    <View style={{flex: 1, justifyContent:'center', alignItems: 'center'}}>
      <CustomText>Configurações aqui</CustomText>
    </View>
  )
}