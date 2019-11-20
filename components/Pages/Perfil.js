import React from 'react'
import { ScrollView, View, TouchableOpacity, StyleSheet, ToastAndroid, StatusBar, Image, Dimensions } from 'react-native'
import {AuthCtx} from './../Context/Auth'
import { withNavigationFocus } from 'react-navigation'
import CustomText from './../Custom/CustomText'
import LoginButton from './../Custom/LoginButton'

const {width, height} = Dimensions.get('window')
const imageHeight = (width / 2) - 30

function Opcao(props) {
  return (
    <TouchableOpacity style={stylesOpcao.container}>
      <CustomText style={stylesOpcao.title}>
        Teste
      </CustomText>
      <CustomText style={stylesOpcao.desc}>
        Testezin
      </CustomText>
    </TouchableOpacity>
  )
}

const stylesOpcao = StyleSheet.create({
  container: {
    flex: 0,
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  title: {
    fontSize: 16
  },
  desc: {
    fontSize: 12
  }
})

function Perfil(props) {
  const {userData} = React.useContext(AuthCtx)

  React.useEffect(() => {
    console.log('salve')
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
              <View style={styles.profilePhoto} />
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
                <View>
                  <Opcao>

                  </Opcao>
                </View>
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
        <LoginButton title="Logar" />
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
    height: 90,
    width: 90,
    backgroundColor: 'gray',
    top: -45,
    borderRadius: 15,
    alignSelf: 'center',
    elevation: 3
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