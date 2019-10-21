import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native'
import CategoryCard from './../Cards/CategoryCard'
import SectionHeader from './../Sections/SectionHeader'

export default function CategoriesSection() {
    const categories = [
        {
            name: 'Japonesa',
            image: require('./../../assets/categories/japanese.jpeg')
        },
        {
            name: 'Salgados',
            image: require('./../../assets/categories/salgados.png')
        },
        {
            name: 'Veganos',
            image: require('./../../assets/categories/veganos.jpg')
        },
        {
            name: 'Doces',
            image: require('./../../assets/categories/doces.png')
        },
        {
            name: 'Massas',
            image: require('./../../assets/categories/massas.jpg')
        },
    ]

    const categoriesCards = categories.map((card, index) => (
        <CategoryCard name={card.name} key={card.name+index} image={card.image} />
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