import React from 'react'
import { View, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import { withNavigation } from 'react-navigation'
import CustomText from '../Custom/CustomText'

function Produto(props) {
  const userData = props.navigation.getParam('userData')
  const { imagem, vendedor, descricao, preco } = userData
  const [width, setWidth] = React.useState(0)
  const [height, setHeight] = React.useState(0)

  const screenWidth = Dimensions.get('window').width

  Image.getSize(imagem, (width, height) => {
    const scaleFactor = width / screenWidth
    const imageHeight = height / scaleFactor

    setWidth(screenWidth)
    setHeight(imageHeight)
  })

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.imageContainer}>
        <Image 
          source={{uri: imagem}}
          style={{width, height}}
        />
        <CustomText bold={true} style={styles.preco}>
          R$ {preco.toFixed(2)}
        </CustomText>
      </View> 
      <View style={styles.info}>
        <CustomText style={styles.descricao}>
          {descricao}
        </CustomText>
        <View style={styles.separator} />
        <TouchableOpacity style={styles.vendedorContainer}>
          {/* <Image>

          </Image> */}
          <CustomText style={styles.nomeVendedor}>
            Vendido por:{'\n'+vendedor.nome}
          </CustomText>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imageContainer: {
    position: 'relative'
  },
  preco: {
    position: 'absolute',
    right: 30,
    bottom: 0,
    backgroundColor: 'tomato',
    padding: 15,
    borderRadius: 15,
    color: 'white',
    fontSize: 17,
    transform: [{translateY: 15}]
  },
  descricao: {
    fontSize: 16
  },
  vendedorContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  separator: {
    borderWidth: 0.2,
    marginVertical: 30
  },
  nomeVendedor: {
    flex: 0,
    backgroundColor: 'white',
    padding: 15,
    textAlign: 'center',
    textAlignVertical: 'center',
    lineHeight: 20,
    fontSize: 15,
    borderWidth: 0.5,
    borderRadius: 30
  },
  info: {
    flex: 1,
    marginTop: 25,
    padding: 15
  }
})

Produto.navigationOptions = ({navigation}) => ({
  title: navigation.getParam('title', 'Produto'),
  headerTitleStyle: {
    fontFamily: 'ubuntu',
    fontWeight: "200"
  }
})

export default withNavigation(Produto)