import React from 'react'
import { View, TouchableOpacity, StyleSheet, FlatList, ToastAndroid } from 'react-native'
import {AuthCtx} from './../Context/Auth'
import { withNavigation } from 'react-navigation'
import CustomText from './../Custom/CustomText'
import LoginButton from './../Custom/LoginButton'

function Option(props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={{paddingVertical: 20, paddingLeft: 10}}>
      <CustomText bold={true} style={{fontSize: 18}}>
        {props.optionText}
      </CustomText>
      <CustomText style={{fontSize: 12, color: 'gray'}}>
        {props.descText}
      </CustomText>
    </TouchableOpacity>
  )
}

function Perfil(props) {
  const {userData, signOut} = React.useContext(AuthCtx)
  
  const options = [
    {
      optionText: 'Adicionar produto',
      descText: 'Comece a vender!',
      onPress: () => ToastAndroid.show('Adicionar produto', ToastAndroid.SHORT)
    },
    {
      optionText: 'Histórico de pedidos',
      descText: 'Veja suas últimas compras',
      onPress: () => ToastAndroid.show('Histórico de pedidos', ToastAndroid.SHORT)
    },
    {
      optionText: 'Vendedores favoritos',
      descText: 'Gerencie os vendedores que você mais gosta',
      onPress: () => ToastAndroid.show('Vendedores favoritos', ToastAndroid.SHORT)
    },
    {
      optionText: 'Mudar Senha',
      descText: 'Altere aqui a senha da sua conta',
      onPress: () => ToastAndroid.show('Mudar Senha', ToastAndroid.SHORT)
    },
    {
      optionText: 'Sair da conta',
      descText: 'Deslogue e troque de conta',
      onPress: () => signOut()
    },
  ]

  return (
    <>
      {userData.logged ? 
        <>
          <View style={styles.header}>
            <CustomText bold={true} style={styles.nome}>{userData.nome}</CustomText>
            <CustomText style={styles.email}>{userData.email}</CustomText>
          </View>
          <View style={styles.container}>
            <FlatList 
              data={options}
              renderItem={({item}) => <Option optionText={item.optionText} onPress={item.onPress} descText={item.descText} />}
              keyExtractor={item => item.optionText}
              ItemSeparatorComponent={() => <View style={{height: 0.5, width: '100%', backgroundColor: 'gray'}}></View>}
            />
          </View>
        </>
        :
        <LoginButton title="Logar" />
      }
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10
  },
  header: {
    width: '100%',
    padding: 20,
    backgroundColor: 'white',
    elevation: 5,
  },
  nome: {
    fontSize: 18
  },
  email: {
    fontSize: 12,
    color: 'gray'
  }
})

export default withNavigation(Perfil)