import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomTextInput from './../components/Custom/CustomTextInput'
import { withNavigation } from 'react-navigation'

function SearchBar(props) {
  const [text, setText] = React.useState('')

  function goToResults() {
    props.navigation.navigate('Produtos', {
      query: '/products/search/' + encodeURI(text),
      title: 'Pesquisa: '+text
    })
  }

  return (
    <View style={styles.searchbar}>
      <Ionicons name="ios-search" style={styles.icon} size={28} color="gray" />
      <CustomTextInput
        style={styles.searchbar_text} 
        placeholder="Pesquise um produto aqui!" 
        placeholderTextColor="grey"
        value={text}
        onChangeText={text => setText(text)}
      />
      {
        text.trim() !== '' ? 
        <>
          <Ionicons onPress={() => setText('')} name="ios-close" style={styles.icon} size={28} color="gray" />
          <Ionicons onPress={goToResults} name="md-send" style={styles.icon} size={28} color="gray" /> 
        </>
        :
        null
      }
    </View>
  );
}

const styles = StyleSheet.create({
  searchbar: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e1e1e1',
    marginTop: 20,
    marginBottom: 10,
    padding: 5,
    borderRadius: 5,
  },
  icon: {
    flex: 0,
    padding: 10
  },
  searchbar_text: {
    flex: 1,
    fontFamily: 'ubuntu'
  }
});

export default withNavigation(SearchBar)