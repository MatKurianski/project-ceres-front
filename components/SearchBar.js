import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SearchBar() {
  return (
    <View style={styles.searchbar}>
      <Ionicons name="ios-search" style={{padding: 10}} size={28} color="grey" />
      <TextInput style={styles.searchbar_text} placeholder placeholder="Pesquise um produto aqui!" placeholderTextColor="grey"/>
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
  searchbar_text: {
    flex: 1,
    fontFamily: 'ubuntu'
  }
});

