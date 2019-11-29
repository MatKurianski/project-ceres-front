import React from 'react'
import { View, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import { withNavigation } from 'react-navigation'
import CustomText from '../Custom/CustomText'
import { Linking } from 'expo'
import WhatsappButton from '../Custom/WhatsappButton'

const screenWidth = Dimensions.get('window').width

function Produto(props) {
  const [height, setHeight] = React.useState(0)
  const userData = props.navigation.getParam('userData')
  const { imagem, vendedor, descricao, preco, categorias } = userData

  React.useEffect(() => {
    Image.getSize(imagem, (width, height) => {
      const scaleFactor = width / screenWidth
      const imageHeight = height / scaleFactor
      setHeight(imageHeight)
    })
  }, [])

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.imageContainer}>
        <Image 
          source={{uri: imagem}}
          style={{width: screenWidth, height}}
        />
        <CustomText bold={true} style={styles.preco}>
          R$ {preco.toFixed(2)}
        </CustomText>
      </View> 
      <View style={styles.info}>
        { 
          descricao.trim() !== '' && descricao !== undefined ? 
          (
            <>
              <CustomText bold={true} style={styles.label}>
                Descrição
              </CustomText>
              <CustomText style={styles.descricao}>
                {descricao}
              </CustomText>
            </>
          ) :
          null
        }
        { 
          categorias.length > 0 ? 
          (
            <>
              <CustomText bold={true} style={styles.label}>
                Categorias
              </CustomText>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.categoriaContainer}>
                {categorias.map(categoria => (
                  <TouchableOpacity
                    key={categoria.idCategoria}
                    onPress={() => props.navigation.navigate('Produtos', {
                      title: 'Categoria : '+categoria.nomeCategoria,
                      query: '/products/categories/'+categoria.idCategoria
                    })} >
                    <CustomText style={styles.categoria}>
                      {categoria.nomeCategoria}
                    </CustomText>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </>
          ) :
          null
        }
        <CustomText bold={true} style={styles.label}>
          Faça um pedido para o vendedor!
        </CustomText>
        <WhatsappButton telefone={vendedor.telefone} />
        <View style={styles.separator} />
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Perfil2', {
            idVendedor: vendedor.id
          })}
          style={styles.vendedorContainer} >
          <Image
            source={{uri: vendedor.foto}}
            style={styles.vendedorFoto}
          />
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
    transform: [{translateY: 15}],
    elevation: 7
  },
  descricao: {
    fontSize: 16
  },
  label: {
    fontSize: 19,
    marginVertical: 20
  },
  categoriaContainer: {
    flexDirection: 'row',
    paddingTop: 10
  },
  categoria: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 0.3,
    marginHorizontal: 10
  },
  vendedorContainer: {
    borderWidth: 0.5,
    borderRadius: 30,
    backgroundColor: 'white',
    padding: 15,
    flexDirection: 'row',
    flex: 0,
    alignSelf: 'center'
  },
  separator: {
    borderWidth: 0.2,
    marginVertical: 30
  },
  nomeVendedor: {
    textAlign: 'center',
    textAlignVertical: 'center',
    lineHeight: 20,
    fontSize: 15,
  },
  vendedorFoto: {
    width: 50, 
    height: 50, 
    resizeMode: 'contain', 
    borderRadius: 100, 
    marginRight: 15, 
    overflow: 'hidden'
  },
  info: {
    flex: 1,
    paddingTop: 5,
    padding: 15,
    elevation: 6,
    backgroundColor: 'white'
  }
})

Produto.navigationOptions = ({navigation}) => ({
  title: navigation.getParam('title', 'Produto'),
  headerTitleStyle: {
    fontFamily: 'ubuntu',
    fontWeight: "200"
  },
  headerStyle: {
    borderBottomWidth: 0,
    elevation: 6
  },
})

export default withNavigation(Produto)