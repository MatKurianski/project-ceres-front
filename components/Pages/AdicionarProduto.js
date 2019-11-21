import React from 'react'
import { KeyboardAvoidingView, StyleSheet, TextInput, View, Button } from 'react-native'
import CustomText from './../Custom/CustomText'
import { TextInputMask } from 'react-native-masked-text'
import { TouchableOpacity } from 'react-native-gesture-handler'

let index = 0

export default function AdicionarProduto(props) {
  const [nome, setNome] = React.useState('')
  const [preco, setPreco] = React.useState(0)
  const [precoNumero, setPrecoNumero] = React.useState('')

  const categorias = ['Vegano', 'Doce', 'Salgado', 'Massa', 'Gourmet', 'Vegetariano', "Sem Lactose", "Low Carb", "Saudável", 'Orgânico']

  const [categoriasSelecionadas, setCategoriasSelecionadas] = React.useState([])

  React.useEffect(() => {
    const array = categorias.map(element => ({
      nome: element,
      selecionada: false
    }))
    setCategoriasSelecionadas(array)
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
                key={element.nome}
                onPress={() => toggleSelected(element.nome)} 
                selecionada={element.selecionada} 
                title={element.nome}/>
            ))
        }
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Button title="Adicionar" onPress={() => props.navigation.pop()}/>
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