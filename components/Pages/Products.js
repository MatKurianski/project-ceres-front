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
  const primeiraReq = React.useRef(true)

  const getProducts = async () => {
    const query = props.navigation.getParam('query')
    setRefreshing(true)
    request(query)
      .then(res => {
        res.data.forEach(produto => produto.imagem = getApiUrl() +'/uploads/produtos/'+ produto.imagem)
        setProdutos(res.data)
      })
      .catch(err => console.err())
      .finally(() => {
        setRefreshing(false)
        primeiraReq.current = false
      })
  }

  React.useEffect(() => {
    getProducts()
  }, [])

  return (
    <View style={styles.container}>
      {
        produtos.length > 0 || primeiraReq.current ? 
        <FlatList 
        data={produtos}
        renderItem={({item}) => <ProductCard title={item.nome} image={{uri: item.imagem}} price={item.preco}/>}
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
  }
})

export default withNavigation(Products)