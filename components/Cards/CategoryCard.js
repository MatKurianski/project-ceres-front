import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'

export default function CategoryCard({name, image}) {
    return (
        <View style={styles.container}>
            <Image
                resizeMethod='scale'
                style={styles.image}
                source={image}
            />
            <Text style={styles.title}>
                {name ? name : 'Undefined'}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 100, 
        height: 100,
        borderRadius: 5,
        elevation: 3,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 5,
        backgroundColor: 'white'
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 5
    },
    title: {
        position: 'absolute',
        bottom: 0,
        width: 100,
        height: 30,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        backgroundColor: 'white',
        textAlign: 'center',
        textAlignVertical: 'center'
    }
})