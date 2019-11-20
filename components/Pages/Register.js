import React from 'react'
import { useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, TextInput, Button, Image, ToastAndroid } from 'react-native'
import CustomText from './../Custom/CustomText'
import axios from 'axios'
import { getApiUrl } from './../../assets/config'

export default function Login(props) {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  function registrar(props) {
    axios.post(getApiUrl()+'/register', {
      nome,
      email,
      senha
    })
    .then(res => {
      const { status, ...userData } = res.data
      if (status === "sucesso") {
        ToastAndroid.show('Registrado com sucesso!', ToastAndroid.LONG);
        props.navigation.pop()
      }
    })
    .catch(e => {
      ToastAndroid.show('Erro de conexão', ToastAndroid.SHORT)
      console.log(e)
    })
    .finally(clearInputs)
  }

  function clearInputs() {
    setNome('')
    setEmail('')
    setSenha('')
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Image style={styles.comidas} source={require('../../assets/logo/comidas.png')} />
      <CustomText bold={true} style={styles.title}>
        Registre-se!
      </CustomText>
      <CustomText style={styles.subtitle}>
        E comece agora mesmo a vender seus produtos!
      </CustomText>
      <TextInput 
        onChangeText={text => setNome(text)}
        value={nome} 
        style={styles.input} 
        placeholder="Seu nome"
      />
      <TextInput 
        onChangeText={text => setEmail(text)}
        value={email} 
        textContentType="emailAddress" 
        type="emailAddress" 
        style={styles.input} 
        placeholder="Email"
      />
      <TextInput
        onChangeText={text => setSenha(text)}
        value={senha}
        secureTextEntry={true}
        textContentType="password"
        type="password"
        style={{...styles.input, marginBottom: 25}}
        placeholder="Senha"
      />
      <Button onPress={() => registrar(props)} title="Registre-se" />
    </KeyboardAvoidingView>
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