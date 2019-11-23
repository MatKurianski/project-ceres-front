import React from 'react'
import { KeyboardAvoidingView, ToastAndroid, StyleSheet, TextInput, View, Button } from 'react-native'
import CustomText from './../Custom/CustomText'
import { TextInputMask } from 'react-native-masked-text'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AuthCtx } from './../Context/Auth'
import request from './../../actions/request'

import * as ImagePicker from 'expo-image-picker'

import FormData from 'form-data'

export default function AdicionarProduto(props) {
  const [nome, setNome] = React.useState('')
  const [preco, setPreco] = React.useState(0)
  const [precoNumero, setPrecoNumero] = React.useState(0)
  const [imagem, setImagem] = React.useState('')
  const [categoriasSelecionadas, setCategoriasSelecionadas] = React.useState([])

  const { userData } = React.useContext(AuthCtx)

  React.useEffect(() => {
    request('/categories')
      .then(res => {
        const categorias = res.data
        const categoriasState = categorias.map(categoria => ({
          id: categoria.idCategoria,
          nome: categoria.nomecategoria,
          selecionada: false
        }))
        setCategoriasSelecionadas(categoriasState)
      })
      .catch(e => {})
  }, [])

  const toggleSelected = categoriaNome => {
    const _categorias = [...categoriasSelecionadas]
    _categorias.forEach(categoria => {
      if(categoria.nome === categoriaNome) {
        categoria.selecionada = !categoria.selecionada
        return
      }
    })
    setCategoriasSelecionadas(_categorias)
  }

  function CategoriaSelection(props) {
    let backgroundColor = 'white'
    let color = 'black'
    if(props.selecionada) {
      backgroundColor = 'green'
      color = 'white'
    }
    return (
      <TouchableOpacity onPress={props.onPress} style={{textAlignVertical: 'center', backgroundColor, margin: 5, borderRadius: 10, borderWidth: 0.3}}>
        <CustomText style={{color, margin: 10}}>
          {props.title}
        </CustomText>
      </TouchableOpacity>
    )
  }

  async function uploadImage() {
    const imagem = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });
    if(!imagem.cancelled) {
      setImagem(imagem)
    }
  }

  function adicionarProduto() {
    if(!nome || precoNumero === 0 || imagem === '') {
      ToastAndroid.show("Revise suas informações", ToastAndroid.SHORT)
      return
    }
    const { token, id } = userData
    const categorias = categoriasSelecionadas
      .filter(categoria => categoria.selecionada)
      .map(categoria => categoria.id)
    
    const form = new FormData()
    form.append('nome', nome)
    form.append('descricao', 'salve')
    form.append('categorias', JSON.stringify(categorias))
    form.append('usuario', id)
    form.append('preco', precoNumero)
    form.append('imagem', {uri: imagem.uri, type: 'image/jpg', name: 'image.jpg'})

    request('/new_product', {
      method: 'POST',
      formdata: true,
      body: form,
      token
    }).then(res => {
      if(res.data.status === 'sucesso') {
        ToastAndroid.show('Sucesso!', ToastAndroid.SHORT)
        props.navigation.pop()
      }
    }).catch(err => console.log)
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <CustomText bold={true} style={styles.label}>
        Nome do produto
      </CustomText>
      <TextInput 
        style={styles.input} 
          value={nome} 
          placeholder="Ex: Cone trufado, bolo de cenoura..." 
          onChangeText={text => setNome(text)}
        />
      <CustomText bold={true} style={styles.label}>
        Preço
      </CustomText>
      <TextInputMask
        type='money' 
        value={preco} 
        style={{
          fontSize: 20,
          textAlign: 'center'
        }}
        includeRawValueInChangeText={true}
        onChangeText={(text, rawText) => {
          setPreco(text)
          setPrecoNumero(rawText)
        }}
      />
      <CustomText bold={true} style={styles.label}>
        Categorias
      </CustomText>
      <View style={styles.categories}>
        {
          categoriasSelecionadas.map((element) => (
              <CategoriaSelection 
                key={element.id}
                onPress={() => toggleSelected(element.nome)} 
                selecionada={element.selecionada} 
                title={element.nome}/>
            ))
        }
      </View>
      <Button title="Carregar imagem" onPress={uploadImage} />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Button title="Adicionar" onPress={() => adicionarProduto()}/>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15
  },
  label: {
    fontSize: 18,
    marginVertical: 16
  },
  input: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: 'gray'
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    flex: 0,
    paddingVertical: 10,
  }
})