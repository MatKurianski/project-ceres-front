import React from 'react'
import ProductCard from './../Cards/ProductCard'
import Section from './Section'

export default function OnlineSellersSection() {
    return (
        <Section title="Produtos de vendedores online agora!" horizontal={false}>
            <ProductCard title='Cone Wilson' seller="Wilson" price='5,00' image={require('./../../assets/products/cone.png')}/>
            <ProductCard title='Balde KFC - 2 pessoas' seller="KFC" price='35,00' image={require('./../../assets/products/kfc.png')}/>
            <ProductCard title='Porção de Macarrão - 2 pessoas' seller="Homem Urso Porco" price='25,00' image={require('./../../assets/products/macarrao.jpg')}/>
        </Section>
    )
}
