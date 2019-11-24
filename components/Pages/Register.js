import React from 'react'
import { useState } from 'react'
import { KeyboardAvoidingView, View, StyleSheet, Image, ToastAndroid, ScrollView } from 'react-native'
import CustomText from './../Custom/CustomText'
import request from './../../actions/request'
import { MaterialCommunityIcons } from '@expo/vector-icons';

import FormData from 'form-data'

import * as ImagePicker from 'expo-image-picker'
import CustomTextInput from '../Custom/CustomTextInput'
import CustomButton from '../Custom/CustomButton'

export default function Login(props) {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [foto, setFoto] = useState(undefined)
  const [textoBotaoFoto, setTextoBotaoFoto] = useState("UPLOAD DE FOTO DE PERFIL")
  const [registrarDesativado, toggleRegistrarDesativado] = useState(false)

  function registrar(props) {
    if(nome === '' || email === '' || senha === '' || !foto) {
      ToastAndroid.show('Faltam informações')
      return
    }
    toggleRegistrarDesativado(true)
    const form = new FormData()
    form.append('nome', nome)
    form.append('email', email)
    form.append('senha', senha)
    form.append('foto', {uri: foto.uri, type: 'image/jpg', name: 'image.jpg'})
    request('/register', {
      method: 'POST',
      body: form,
      formdata: true
    }).then(res => {
        const { status } = res.data
        if (status === "sucesso") {
          ToastAndroid.show('Registrado com sucesso!', ToastAndroid.LONG);
          props.navigation.pop()
        }
      })
      .catch(e => console.log(e))
      .finally(() => {
        clearInputs()
        toggleRegistrarDesativado(false)
      })
  }

  async function carregarFoto() {
    const imagem = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    })
    if(!imagem.cancelled) {
      setFoto(imagem)
      setTextoBotaoFoto('FOTO CARREGADA')
    }
  }

  function clearInputs() {
    setNome('')
    setEmail('')
    setSenha('')
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Image style={styles.comidas} source={require('../../assets/logo/comidas.png')} />
        <CustomText bold={true} style={styles.title}>
          Registre-se!
        </CustomText>
        <CustomText style={styles.subtitle}>
          E comece agora mesmo a vender seus produtos!
        </CustomText>
        <CustomTextInput 
          onChangeText={text => setNome(text)}
          value={nome} 
          style={styles.input} 
          placeholder="Seu nome"
        />
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
        <CustomButton onPress={() => carregarFoto()} >
          <MaterialCommunityIcons name="upload" size={18} color="white" />
          {textoBotaoFoto}
        </CustomButton>
        <View style={{marginTop: 16}} >
        <CustomButton title="Registre-se" disabled={registrarDesativado} onPress={() => registrar(props)} />
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
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