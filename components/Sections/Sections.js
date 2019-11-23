import React from 'react';
import { SectionList } from 'react-native';
import ProductCard from './../Cards/ProductCard'
import SectionHeader from './../Sections/SectionHeader'

export default function Sections(props) {
	const dataOnline = [{
			title: 'Cone Wilson',
			price: '5,00',
			image: require('./../../assets/products/cone.png'),
			seller: {
				name: 'Wilson',
				online: true
			}
		},{
			title: 'Balde de Frango - 2 Pessoas',
			price: '35,00',
			image: require('./../../assets/products/kfc.png'),
			seller: {
				name: 'KFC Universitário',
				online: true
			}
		}
	]

	const dataAgain = [{
		title: 'Combo 5 esfihas',
		price: '7,99',
		image: require('./../../assets/products/esfihas.jpg'),
		seller: {
			name: 'Habib\'s',
			online: true
		}
	}]

	return (
		<SectionList 
			renderItem={({item}) => (
				<ProductCard title={item.title} seller={item.seller.name} online={item.seller.online} price={item.price} image={item.image}/>
			)}
			renderSectionHeader={({section}) => <SectionHeader>{section.title}</SectionHeader>}
			keyExtractor={(item, index) => item.title+index}
			sections={[
				{
					title: 'Peça de novo!', data: dataAgain,
				},
				{
					title: 'Produtos de vendedores online agora!', data: dataOnline,
				},
			]}
		/>
	)
}