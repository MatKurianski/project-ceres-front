import React from 'react'
import { ScrollView, View, TouchableOpacity, StyleSheet, FlatList, StatusBar, Image, Dimensions } from 'react-native'
import {AuthCtx} from './../Context/Auth'
import { withNavigationFocus } from 'react-navigation'
import CustomText from './../Custom/CustomText'
import LoginButton from './../Custom/LoginButton'
import { getApiUrl } from './../../assets/config'
import Product from './../Pages/Products'
import { verificarSeEstaNaEach } from '../../actions/estaNaEach'
import { MaterialIcons, FontAwesome } from '@expo/vector-icons'
import request from '../../actions/request'
import { Linking } from 'expo'
import WhatsappButton from '../Custom/WhatsappButton'

const { width } = Dimensions.get('window')
const imageHeight = (width / 2) - 30

function Opcao(props) {
  return (
    <TouchableOpacity onPress={() => props.onPress()} style={stylesOpcao.container}>
      <MaterialIcons name={props.icon} size={32} style={stylesOpcao.icon} />
      <View>
        <CustomText style={stylesOpcao.title}>
          {props.title}
        </CustomText>
        <CustomText style={stylesOpcao.desc}>
          {props.desc}
        </CustomText>
      </View>
    </TouchableOpacity>
  )
}

const stylesOpcao = StyleSheet.create({
  container: {
    flex: 0,
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
    textAlignVertical: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 18
  },
  desc: {
    fontSize: 12
  },
  icon: {
    marginRight: 10
  }
})

function Perfil(props) {
  const {userData, signOut} = React.useContext(AuthCtx)
  const [vendedor, setVendedor] = React.useState({})
  const idVendedor = props.navigation.getParam('idVendedor')
  console.log(vendedor)

  let isMe = false
  if(userData.logged) {
    if(!idVendedor || idVendedor === userData.id) isMe = true
  }

  const opcoes = [
    {
      title: "Adicionar produto",
      desc: "Comece a anunciar agora mesmo!",
      onPress: () => props.navigation.navigate('AdicionarProduto'),
      icon: 'add'
    },
    {
      title: "Sair",
      desc: "Fazer logoff",
      onPress: () => signOut(),
      icon:   "exit-to-app"
    }
  ]

  React.useEffect(() => {
    StatusBar.setBackgroundColor('tomato')
    StatusBar.setBarStyle("light-content")
    verificarSeEstaNaEach()
    const listener1 = props.navigation.addListener('didFocus', () => {
      StatusBar.setBackgroundColor('tomato')
      StatusBar.setBarStyle("light-content")
      verificarSeEstaNaEach()
    })
    const listener2 = props.navigation.addListener('willBlur', () => {
      StatusBar.setBackgroundColor('#fff')
      StatusBar.setBarStyle("dark-content")
    })

    return () => {
      listener1.remove()
      listener2.remove()
    }
  }, [])

  React.useEffect(() => {
    if(!userData.logged && !idVendedor) return
    request('/vendedor/'+ (isMe ? userData.id : idVendedor))
      .then(res => {
        const _vendedor = res.data
        _vendedor.foto = getApiUrl() + '/uploads/vendedores/' + _vendedor.foto
        _vendedor.produtos.forEach(produto => {
          produto.imagem = getApiUrl() + '/uploads/produtos/' + produto.imagem
        })
        setVendedor(_vendedor)
      })
      .then(err => {})
  }, [userData.logged])

  return (
    <>
      {userData.logged || idVendedor ? 
        <>
          <ScrollView showsVerticalScrollIndicator={false} style={styles.background}>
            <View style={{backgroundColor: 'tomato', position: 'absolute', width, height: 300}} />
            <View style={styles.container}>
              <Image style={styles.profilePhoto} source={{uri: vendedor.foto}} />
              <View style={styles.profileInfo}>
                <CustomText bold={true} style={styles.nome}>
                  {vendedor.nome}
                </CustomText>
                <View style={styles.secao}>
                  <View style={styles.square}>
                    <CustomText bold={true} style={styles.squareBigText}>{vendedor.produtos ? vendedor.produtos.length : '?'}</CustomText>
                    <CustomText style={styles.squareSmallText}>Produtos</CustomText>
                  </View>
                  <View style={styles.square}>
                    <CustomText bold={true} style={styles.squareBigText}>4.39</CustomText>
                    <CustomText style={styles.squareSmallText}>Estrelas</CustomText>
                  </View>
                </View>
                {
                  isMe ? 
                  <FlatList
                    data={opcoes} 
                    renderItem={({item}) => <Opcao title={item.title} icon={item.icon} desc={item.desc} onPress={item.onPress} />}
                    keyExtractor={item => item.title}
                    ItemSeparatorComponent={() => <View style={{borderWidth: 0.5, borderColor: 'gray'}} />}
                  /> : 
                  <WhatsappButton telefone={vendedor.telefone} />
                }
              </View>
            </View>
            <View style={styles.secaoMeusProdutos}>
              <CustomText bold={true} style={styles.secaoTitulo}>
                Produtos
              </CustomText>
              <Product
                productData={vendedor.produtos || []} 
              />
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
    // backgroundColor: '#e8e8e8',
    zIndex: -1
  },
  container: {
    position: 'relative',
    backgroundColor: 'white',
    marginTop: 100,
    elevation: 7,
    flex: 1,
    borderRadius: 10,
    marginHorizontal: 15
  },
  profilePhoto: {
    position: 'absolute',
    height: 95,
    width: 95,
    backgroundColor: 'gray',
    top: -45,
    borderRadius: 95 / 2  ,
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
  secaoMeusProdutos: {
    flex: 0,
    padding: 10
  },
  secaoTitulo: {
    marginTop: 15,
    marginBottom: 25,
    marginLeft: 10,
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