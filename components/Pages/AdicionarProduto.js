import React from 'react'
import { KeyboardAvoidingView, ToastAndroid, StyleSheet, TextInput, View, Button } from 'react-native'
import CustomText from './../Custom/CustomText'
import { TextInputMask } from 'react-native-masked-text'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { getApiUrl } from './../../assets/config'
import { AuthCtx } from './../Context/Auth'
import axios from 'axios'

export default function AdicionarProduto(props) {
  const [nome, setNome] = React.useState('')
  const [preco, setPreco] = React.useState(0)
  const [precoNumero, setPrecoNumero] = React.useState(0)

  const [categoriasSelecionadas, setCategoriasSelecionadas] = React.useState([])

  const { userData } = React.useContext(AuthCtx)

  React.useEffect(() => {
    axios.get(getApiUrl()+'/categories')
      .then(res => {
        const categorias = res.data
        const categoriasState = categorias.map(categoria => ({
          id: categoria.idCategoria,
          nome: categoria.nomecategoria,
          selecionada: false
        }))
        setCategoriasSelecionadas(categoriasState)
      })
      .catch(e => {
        ToastAndroid.show('Erro de conexão', ToastAndroid.SHORT)
        console.log(e)
      })
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

  function adicionarProduto() {
    if(!nome || precoNumero === 0) {
      ToastAndroid.show("Revise suas informações", ToastAndroid.SHORT)
      return
    }
    const { token, id } = userData
    const categorias = categoriasSelecionadas
      .filter(categoria => categoria.selecionada)
      .map(categoria => categoria.id)
    axios.post(getApiUrl()+'/new_product', {
      nome,
      preco: precoNumero,
      descricao: 'salve',
      categorias,
      usuario: id
    },{
      headers: { token }
    }).then(res => {
      const data = res.data
      if(data.status !== 'sucesso') {
        console.log(data)
      } else {
        ToastAndroid.show('Produto adicionado!', ToastAndroid.SHORT)
        props.navigation.pop()
      }
    }).catch(err => {
        ToastAndroid.show('Erro de conexão', ToastAndroid.SHORT)
        console.log(err)
      })
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