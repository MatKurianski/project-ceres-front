import React from 'react'
import { View, StyleSheet, Dimensions, KeyboardAvoidingView } from 'react-native'
import CustomText from '../Custom/CustomText'
import request from '../../actions/request'
import { AuthCtx } from './../Context/Auth'
import { withNavigation } from 'react-navigation'
import { Rating } from 'react-native-ratings'
import CustomTextInput from '../Custom/CustomTextInput'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CustomButton from '../Custom/CustomButton'

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
        if(status === 'sucesso') props.navigation.goBack()
      }
    }).catch(e => {})
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      {
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
        <CustomText>
          Você já avaliou
        </CustomText>
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