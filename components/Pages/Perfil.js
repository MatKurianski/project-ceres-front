import React from 'react'
import { ScrollView, View, TouchableOpacity, StyleSheet, FlatList, StatusBar, Image, Dimensions } from 'react-native'
import {AuthCtx} from './../Context/Auth'
import { withNavigationFocus } from 'react-navigation'
import CustomText from './../Custom/CustomText'
import LoginButton from './../Custom/LoginButton'
import { getApiUrl } from './../../assets/config'

const {width, height} = Dimensions.get('window')
const imageHeight = (width / 2) - 30

function Opcao(props) {
  return (
    <TouchableOpacity onPress={() => props.onPress()} style={stylesOpcao.container}>
      <CustomText style={stylesOpcao.title}>
        {props.title}
      </CustomText>
      <CustomText style={stylesOpcao.desc}>
        {props.desc}
      </CustomText>
    </TouchableOpacity>
  )
}

const stylesOpcao = StyleSheet.create({
  container: {
    flex: 0,
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: 'white'
  },
  title: {
    fontSize: 18
  },
  desc: {
    fontSize: 12
  }
})

function Perfil(props) {
  const {userData, signOut} = React.useContext(AuthCtx)
  let fotoUrl = undefined
  if(userData.logged) fotoUrl = getApiUrl() + '/uploads/vendedores/' + userData.foto

  const opcoes = [
    {
      title: "Adicionar produto",
      desc: "Comece a anunciar agora mesmo!",
      onPress: () => props.navigation.navigate('AdicionarProduto')
    },
    {
      title: "Sair",
      desc: "Fazer logoff",
      onPress: () => signOut()
    }
  ]

  React.useEffect(() => {
    StatusBar.setBackgroundColor('#e8e8e8')
    const listener1 = props.navigation.addListener('didFocus', () => {
      StatusBar.setBackgroundColor('#e8e8e8')
    })
    const listener2 = props.navigation.addListener('willBlur', () => {
      StatusBar.setBackgroundColor('#fff')
    })

    return () => {
      listener1.remove()
      listener2.remove()
    }
  }, [])

  return (
    <>
      {userData.logged ? 
        <>
          <ScrollView showsVerticalScrollIndicator={false} style={styles.background}>
            <View style={styles.container}>
              <Image style={styles.profilePhoto} source={{uri: fotoUrl}} />
              <View style={styles.profileInfo}>
                <CustomText bold={true} style={styles.nome}>
                  {userData.nome}
                </CustomText>
                <View style={styles.secao}>
                  <View style={styles.square}>
                    <CustomText bold={true} style={styles.squareBigText}>6</CustomText>
                    <CustomText style={styles.squareSmallText}>Produtos</CustomText>
                  </View>
                  <View style={styles.square}>
                    <CustomText bold={true} style={styles.squareBigText}>4.39</CustomText>
                    <CustomText style={styles.squareSmallText}>Estrelas</CustomText>
                  </View>
                </View>
                <FlatList
                  data={opcoes} 
                  renderItem={({item}) => <Opcao title={item.title} desc={item.desc} onPress={item.onPress} />}
                  keyExtractor={item => item.title}
                  ItemSeparatorComponent={() => <View style={{borderWidth: 0.5, borderColor: 'gray'}} />}
                />
                <View style={styles.secao}>
                  <CustomText bold={true} style={styles.secaoTitulo}>
                    Meus produtos
                  </CustomText>
                  <Image style={styles.produto} source={{uri: 'https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313__340.jpg'}} />
                  <Image style={styles.produto} source={{uri: 'https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313__340.jpg'}} />
                  <Image style={styles.produto} source={{uri: 'https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313__340.jpg'}} />
                  <Image style={styles.produto} source={{uri: 'https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313__340.jpg'}} />
                  <Image style={styles.produto} source={{uri: 'https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313__340.jpg'}} />
                  <Image style={styles.produto} source={{uri: 'https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313__340.jpg'}} />
                </View>
              </View>

            </View>
          </ScrollView>
        </>
        :
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 15}}>
          <CustomText style={{marginBottom: 12}}>
            Você precisa estar logado para ver essa página
          </CustomText>
          <LoginButton title="Logar" />
        </View>
      }
    </>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#e8e8e8'
  },
  container: {
    position: 'relative',
    backgroundColor: 'white',
    marginTop: 100,
    elevation: 7,
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginHorizontal: 5
  },
  profilePhoto: {
    position: 'absolute',
    height: 95,
    width: 95,
    backgroundColor: 'gray',
    top: -45,
    borderRadius: 15,
    alignSelf: 'center',
  },
  profileInfo: {
    flex: 0,
    marginTop: 45,
    justifyContent: 'center',
    alignContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  nome: {
    fontSize: 24,
    textAlign: 'center'
  },
  secao: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap'
  },
  secaoTitulo: {
    marginTop: 15,
    marginBottom: 25,
    fontSize: 16,
    width: '100%'
  },
  square: {
    width: width / 3,
    backgroundColor: 'white',
    paddingVertical: 10,
    marginVertical: 13,
  },
  squareBigText: {
    fontSize: 22,
    textAlign: 'center',
  },
  squareSmallText: {
    fontSize: 12,
    textAlign: 'center'
  },
  produto: {
    height: imageHeight, 
    width: imageHeight,
    marginBottom: 13,
    borderRadius: 20
  },
  botao: {
    backgroundColor: 'orange',
    borderRadius: 30,
    padding: 6,
    margin: 5
  },
  botaoTexto: {
    color: 'white',
    fontSize: 16
  }
})

export default withNavigationFocus(Perfil)