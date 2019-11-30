import React from 'react'
import { View, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView, Alert } from 'react-native'
import { withNavigation } from 'react-navigation'
import CustomText from '../Custom/CustomText'
import WhatsappButton from '../Custom/WhatsappButton'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { AuthCtx } from './../Context/Auth'
import request from '../../actions/request'
import { Rating } from 'react-native-ratings'

const screenWidth = Dimensions.get('window').width

function Produto(props) {
  const [height, setHeight] = React.useState(0)
  const { userData } = React.useContext(AuthCtx)
  const dadosProduto = props.navigation.getParam('userData')
  const { imagem, vendedor, descricao, preco, categorias, idProduto } = dadosProduto

  const deletarProduto = () => {
    Alert.alert(
      'Tem certeza disso?',
      'Uma vez removido, o produto não poderá ser recuperado',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Desejo deletar', onPress: () => {
          const { token } = userData
          request('/products/'+idProduto, {
            method: 'DELETE',
            token: token,
          })
          .then(res => {
            const { status } = res.data
            if(status ==='sucesso') props.navigation.goBack()
          })
          .catch(e => console.log(e))
        }},
      ],
      {cancelable: false},
    );      
  }

  React.useEffect(() => {
    Image.getSize(imagem, (width, height) => {
      const scaleFactor = width / screenWidth
      const imageHeight = height / scaleFactor
      setHeight(imageHeight)
    })
  }, [])

  React.useEffect(() => {
    if(vendedor.id === userData.id) {
      props.navigation.setParams({
        deleteButton: () => (
          <MaterialCommunityIcons 
            name="delete-outline"
            color="red"
            size={32}
            style={{paddingHorizontal: 15}}
            onPress={() => deletarProduto()}
          />
        )
      })
    }
  }, [userData])

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
          Avaliações
        </CustomText>
        <View style={styles.reviewContainer}>
          <View style={styles.reviewRatingContainer}>
            <CustomText bold style={styles.reviewCount}>
              4.5 / 5
            </CustomText>
            <Rating
              imageSize={40}
              type="heart"
              startingValue={4.5}
              fractions={2}
              ratingCount={5}
              readonly
            />
          </View>
          <View style={styles.reviewOptions}>
            <TouchableOpacity style={[styles.reviewOptionButton, styles.reviewOptionsButtonLeft]} >
              <CustomText style={styles.reviewOptionButtonText} >
                Avaliar
              </CustomText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.reviewOptionButton} >
              <CustomText style={styles.reviewOptionButtonText}>
                Ver avaliações
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
        {
          vendedor.id !== userData.id ?
          <>
            <CustomText bold={true} style={styles.label}>
              Faça um pedido para o vendedor!
            </CustomText>
            <WhatsappButton telefone={vendedor.telefone} />
          </> : null
        }
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
  reviewContainer: {
    borderRadius: 8,
    borderWidth: 0.3,
    backgroundColor: 'white',
    borderColor: 'grey',
  },
  reviewRatingContainer: {
    paddingVertical: 20
  },
  reviewCount: {
    fontSize: 36,
    textAlign: 'center',
    marginBottom: 15
  },
  reviewOptions: {
    flexDirection: 'row',
    flex: 1
  },
  reviewOptionsButtonLeft: {
    borderRightWidth: 0.5
  },
  reviewOptionButton: {
    flex: 1,
    paddingVertical: 15,
    borderTopWidth: 0.5
  },
  reviewOptionButtonText: {
    textAlign: 'center',
    fontSize: 16,
    textAlignVertical: 'center'
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
  headerRight: navigation.getParam('deleteButton')
})

export default withNavigation(Produto)