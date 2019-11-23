import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import CategoryCard from './../Cards/CategoryCard'
import SectionHeader from './../Sections/SectionHeader'
import { getApiUrl } from './../../assets/config'
import axios from 'axios'
import { withNavigation } from 'react-navigation'

function CategoriesSection(props) {
    const [categories, setCategories] = React.useState([])

    React.useEffect(() => {
      axios.get(getApiUrl()+'/categories')
        .then(res => {
          const _categories = res.data
          setCategories(_categories)
        })
    }, [])

    const categoriesCards = categories.map(categoria => (
      <CategoryCard name={categoria.nomecategoria} key={categoria.idCategoria} onPress={() => props.navigation.navigate('Produtos', {
        title: 'Categoria: '+categoria.nomecategoria,
        query: '/products/?categoryId='+categoria.idCategoria
      })} />
    ))

    return (
        <View style={styles.container}>
        <SectionHeader>Categorias</SectionHeader>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} styles={styles.scrollview}>
            {categoriesCards}
        </ScrollView>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        backgroundColor: 'white'
    },
    scrollview: {
        borderWidth: 1,
        borderColor: 'grey',
        width: '100%',
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20
    }
})

export default withNavigation(CategoriesSection)