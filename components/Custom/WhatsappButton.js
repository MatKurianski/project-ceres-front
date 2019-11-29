import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Linking } from 'expo'
import CustomText from './CustomText'
import { FontAwesome } from '@expo/vector-icons'

export default function WhatsappButton({ telefone }) {
  return(
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: (!telefone || telefone.trim() === '') ? 'gray' : 'tomato',
        borderRadius: 10,
        flex: 0,
        alignSelf: 'center'
      }}
      disabled={!telefone || telefone === ''}
      onPress={()  => {
        Linking.openURL('whatsapp://send?phone=55'+telefone)
      }}
    >
      <FontAwesome style={{marginRight: 8}} size={16} color="white" name="whatsapp" />
      <CustomText style={{color: 'white', flex: 0}}>
        Enviar mensagem
      </CustomText>
    </TouchableOpacity>
  )
}