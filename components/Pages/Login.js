import React from 'react'
import { View, StyleSheet, TextInput, Button, Image } from 'react-native'
import CustomText from './../Custom/CustomText'

export default function Login() {  
  return (
    <View style={styles.container}>
      <Image style={styles.comidas} source={require('../../assets/logo/comidas.png')} />
      <CustomText bold={true} style={styles.title}>
        Faça login!
      </CustomText>
      <CustomText style={styles.subtitle}>
        Para anunciar produtos, é necessário que você esteja logado
      </CustomText>
      <TextInput textContentType="emailAddress" type="emailAddress" style={styles.input} placeholder="Email" />
      <TextInput secureTextEntry={true} textContentType="password" type="password" style={{...styles.input, marginBottom: 25}} placeholder="Senha" />
      <Button title="Logar" />
      <CustomText style={styles.opcoesFinais}>
        Não tenho conta (cadastrar)
      </CustomText>
      <CustomText style={styles.opcoesFinais}>
        Esqueci minha senha
      </CustomText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 15
  },
  title: {
    width: '100%',
    fontSize: 32,
    marginTop: 15
  },
  subtitle: {
    marginVertical: 15,
    fontSize: 11,
    color: 'grey'
  },
  input: {
    padding: 13,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'grey'
  },
  comidas: {
    width: '48%',
    height: 45,
    resizeMode: 'contain',
    justifyContent: 'flex-end'
  },
  opcoesFinais: {
    color: 'blue',
    textAlign: 'center',
    width: '100%',
    fontSize: 12,
    marginTop: 20
  }
})