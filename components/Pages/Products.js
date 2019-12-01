import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { withNavigation } from 'react-navigation'
import { getApiUrl } from './../../assets/config'
import ProductCard from './../Cards/ProductCard'
import CustomText from '../Custom/CustomText'
import request from '../../actions/request'

function Products(props) {
  const [produtos, setProdutos] = React.useState([])
  const [isRefreshing, setRefreshing] = React.useState(false)
  const [primeiraReq, setPrimeiraReq] = React.useState(true)

  const getProducts = async () => {
    const query = props.navigation.getParam('query')
    if(props.productData) return
    setRefreshing(true)
    request(query || props.query || '/products')
      .then(res => {
        res.data.forEach(produto => {
          produto.imagem = getApiUrl() +'/uploads/produtos/'+ produto.imagem
          produto.vendedor.foto = getApiUrl() +'/uploads/vendedores/'+ produto.vendedor.foto
        })
        let produtos = res.data
        if(props.limit) produtos = produtos.slice(0, props.limit)
        setProdutos(produtos)
      })
      .catch(err => console.err())
      .finally(() => {
        setRefreshing(false)
        setPrimeiraReq(false)
      })
  }

  React.useEffect(() => {
    getProducts()
  }, [])

  React.useEffect(() => {
    const listener1 = props.navigation.addListener('willFocus', getProducts)
    return listener1.remove
  }, [primeiraReq])

  return (
    <View style={styles.container}>
      {
        produtos.length > 0 || primeiraReq ? 
        <FlatList 
        data={props.productData || produtos}
        renderItem={({item}) => <ProductCard 
          title={item.nome}
          image={{uri: item.imagem}}
          price={item.preco}
          online={item.vendedor.online}
          seller={item.vendedor.nome}
          onPress={() => props.navigation.navigate('Produto', {userData: item, title: item.nome})}
        />}
        keyExtractor={item => `${item.idProduto}`}
        onRefresh={getProducts}
        refreshing={isRefreshing}
      /> : 
      <CustomText style={{flex: 1, textAlign: 'center', textAlignVertical: 'center'}}>
        Sem produtos :/
      </CustomText>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8
  }
})

Products.navigationOptions = ({navigation}) => ({
  title: navigation.getParam('title', 'Produtos'),
  headerStyle: {
    borderBottomWidth: 0,
    elevation: 0
  },
  headerTitleStyle: {
    fontFamily: 'ubuntu',
    fontWeight: "200"
  }
})

export default withNavigation(Products)