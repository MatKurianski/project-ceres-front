import React from 'react'
import { useState, useContext } from 'react'
import { KeyboardAvoidingView, StyleSheet, TextInput, Button, Image, ToastAndroid } from 'react-native'
import CustomText from './../Custom/CustomText'
import { AuthCtx } from './../Context/Auth'
import axios from 'axios'
import { getApiUrl } from './../../assets/config'

export default function Login(props) {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const { signIn } = useContext(AuthCtx)

  function logar(props) {
    axios.post(getApiUrl()+'/login', {
      email,
      senha
    })
    .then(res => {
      const { status, ...userData } = res.data
      if (status === "sucesso") {
        signIn(userData)
        ToastAndroid.show('Logado com sucesso!', ToastAndroid.LONG);
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
    setEmail('')
    setSenha('')
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Image style={styles.comidas} source={require('../../assets/logo/comidas.png')} />
      <CustomText bold={true} style={styles.title}>
        Faça login!
      </CustomText>
      <CustomText style={styles.subtitle}>
        Para anunciar produtos, é necessário que você esteja logado
      </CustomText>
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
      <Button onPress={() => logar(props)} title="Logar" />
      <CustomText onPress={() => props.navigation.navigate('Register')} style={styles.opcoesFinais}>
        Não tenho conta (cadastrar)
      </CustomText>
      <CustomText style={styles.opcoesFinais}>
        Esqueci minha senha
      </CustomText>
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