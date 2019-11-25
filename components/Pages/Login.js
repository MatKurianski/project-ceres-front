import React from 'react'
import { useState, useContext } from 'react'
import { StyleSheet, Image, ToastAndroid } from 'react-native'
import CustomText from './../Custom/CustomText'
import CustomTextInput from './../Custom/CustomTextInput'
import { AuthCtx } from './../Context/Auth'

import request from './../../actions/request'
import CustomButton from '../Custom/CustomButton'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function Login(props) {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const { signIn } = useContext(AuthCtx)
  const [botaoLogarDesativado, setBotaoLogarDesativado] = useState(false)

  function logar(props) {
    if(email.length <= 0 || senha.length <= 0) return
    setBotaoLogarDesativado(true)
    request('/login', {
      body: {
        email, senha
      },
      method: 'POST'
    })
    .then(res => {
      const { status, ...userData } = res.data
      if (status === "sucesso") {
        signIn(userData)
        ToastAndroid.show('Logado com sucesso!', ToastAndroid.LONG);
        request('/online', {
          method: 'POST',
          token: userData.token,
          disableConnectionErrorMessage: true
        }).then(res => console.log(res.data))
          .catch(e => {})
        props.navigation.pop()
      } else if(userData.mensagem !== undefined) {
        ToastAndroid.show(userData.mensagem, ToastAndroid.SHORT)
      }
    })
    .catch(e => {})
    .finally(() => {
      clearInputs()
      setBotaoLogarDesativado(false)
    })
  }

  function clearInputs() {
    setEmail('')
    setSenha('')
  }

  return (
    <KeyboardAwareScrollView enableOnAndroid style={styles.container} behavior="padding">
      <Image style={styles.comidas} source={require('../../assets/logo/comidas.png')} />
      <CustomText bold={true} style={styles.title}>
        Faça login!
      </CustomText>
      <CustomText style={styles.subtitle}>
        Para anunciar produtos, é necessário que você esteja logado
      </CustomText>
      <CustomTextInput 
        onChangeText={text => setEmail(text)}
        value={email} 
        textContentType="emailAddress" 
        type="emailAddress" 
        style={styles.input} 
        placeholder="Email"
      />
      <CustomTextInput
        onChangeText={text => setSenha(text)}
        value={senha}
        secureTextEntry={true}
        textContentType="password"
        type="password"
        style={{...styles.input, marginBottom: 25}}
        placeholder="Senha"
      />
      <CustomButton disabled={botaoLogarDesativado} onPress={() => logar(props)} title="Logar" />
      <CustomText onPress={() => props.navigation.navigate('Register')} style={styles.opcoesFinais}>
        Não tenho conta (cadastrar)
      </CustomText>
    </ KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingTop: 50
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
    color: 'tomato',
    textAlign: 'center',
    width: '100%',
    fontSize: 14,
    marginTop: 25
  }
})