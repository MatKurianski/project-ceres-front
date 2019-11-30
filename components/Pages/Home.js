import React from 'react'
import { View, ScrollView, StyleSheet, AsyncStorage } from 'react-native'
import SearchBar from '../SearchBar'
import CategoriesSection from '../Sections/CategoriesSection'
import SectionHeader from '../Sections/SectionHeader'
import Products from './Products'
import { AuthCtx, TOKEN_KEY } from '../Context/Auth'

export default function Home() {
  const { setUserData } = React.useContext(AuthCtx)

  React.useEffect(() => {
      AsyncStorage.getItem(TOKEN_KEY)
        .then(item => {
          if(item === null) return
          const itemObject = JSON.parse(item)
          setUserData({logged: true, ...itemObject})
        })
        .catch(e => {})
  }, [])

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled'>
        <SearchBar />
        <CategoriesSection />
        <SectionHeader>
          Todos os produtos
        </SectionHeader>
        <Products />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 8
  }
});