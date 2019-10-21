import React from 'react';
import CategoryCard from './../Cards/CategoryCard'
import Section from './Section'

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
        <Section title="Categorias" horizontal={true} centerContent={true} contentContainerStyle={{flexGrow: 1}}>
            {categoriesCards}
        </Section>
    );
}
