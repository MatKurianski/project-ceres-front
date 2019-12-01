
import React from 'react'
import { ScrollView, StyleSheet, FlatList } from 'react-native'
import CustomText from '../Custom/CustomText'
import AvaliacaoCard from '../Cards/AvaliacaoCard'
import request from '../../actions/request'

export default function Avaliacoes(props) {
  const idProduto  = props.navigation.getParam('idProduto')
  const [avaliacoes, setAvaliacoes] = React.useState([])

  React.useEffect(() => {
    request('/product/rate/'+idProduto, {
      method: 'GET'
    })
      .then(req => setAvaliacoes(req.data))
      .catch(e => {})
  }, [])

  return (
    <ScrollView contentContainerStyle={styles.container}>
      { avaliacoes.length === 0 ? 
        <CustomText>Sem avaliações</CustomText> :
        
        <FlatList
          data={avaliacoes}
          renderItem={({item}) => <AvaliacaoCard nota={item.nota} comentario={item.comentario} />}
          keyExtractor={item => 'u'+item.pk_idUsuario+'p'+item.pk_idProduto}
        />
      }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center'
  }
})