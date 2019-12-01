import React from 'react'
import { ToastAndroid, StyleSheet, Dimensions, KeyboardAvoidingView } from 'react-native'
import CustomText from '../Custom/CustomText'
import request from '../../actions/request'
import { AuthCtx } from './../Context/Auth'
import { withNavigation } from 'react-navigation'
import { Rating } from 'react-native-ratings'
import CustomTextInput from '../Custom/CustomTextInput'
import CustomButton from '../Custom/CustomButton'
import AvaliacaoCard from '../Cards/AvaliacaoCard'
import LoginButton from '../Custom/LoginButton'

const {height, width} = Dimensions.get('window');

function FazerAvaliacao(props) {
  const idProduto = props.navigation.getParam('idProduto')
  const [isLoading, setLoading] = React.useState(true)
  const [avaliacao, setAvaliacao] = React.useState(undefined)
  const { userData } = React.useContext(AuthCtx)
  const [estrelas, setEstrelas] = React.useState(1)
  const [comentario, setComentario] = React.useState('')

  React.useEffect(() => {
    request('/products/rate/'+idProduto, {
      token: userData.token,
      method: 'GET'
    }).then(res => {
      const result = res.data
      if(result.length > 0) setAvaliacao(result[0])
    }).finally(() => setLoading(false))
  }, [])

  function submeterAvaliacao() {
    request('/products/rate/'+idProduto, {
      method: 'POST',
      body: {
        idProduto,
        nota: estrelas,
        comentario
      },
      token: userData.token
    }).then(res => {
      if(res.data) {
        const { status } = res.data
        if(status === 'sucesso') props.navigation.navigate('Home')
      }
    }).catch(e => {})
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      {
        userData.logged ?
          isLoading ?  null :
            !avaliacao ? 
          <>
            <Rating
              imageSize={60}
              type="heart"
              startingValue={1}
              fractions={0}
              ratingCount={5}
              onFinishRating={rating => setEstrelas(parseInt(rating))}
            />
            <CustomTextInput
              style={styles.comentarioTextInput}
              placeholder="Faça um comentário (opcional)"
              multiline={true} 
              numberOfLines={6}
              value={comentario}
              onChangeText={comentario => setComentario(comentario)}
            />
            <CustomButton title="Avaliar" onPress={() => submeterAvaliacao()}/>
          </> :
          <>
            <CustomText>
              Você já avaliou
            </CustomText>
            <AvaliacaoCard comentario={avaliacao.comentario} nota={avaliacao.nota} />
            <CustomButton title="Remover avaliação" onPress={() => {
              request('/products/undo_rate/'+idProduto, {
                method: 'DELETE',
                token: userData.token
              }).then(res => {
                  if(res.data.status === 'sucesso') {
                    ToastAndroid.show('Sucesso!', ToastAndroid.SHORT)
                    props.navigation.navigate('Home')  
                  }
                }).catch(e => console.log(e))
            }} />
          </>
          :
          <>
            <CustomText>
              Você precisa estar logado
            </CustomText>
            <LoginButton title="Fazer login" />
          </>
        }
    </ KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30
  },
  comentarioTextInput: {
    borderWidth: 0.5,
    padding: 10,
    marginTop: 25,
    justifyContent: "flex-start",
    textAlignVertical: 'top',
    fontSize: 16,
    width: width - 20,
    marginBottom: 30
  }
})

export default withNavigation(FazerAvaliacao)