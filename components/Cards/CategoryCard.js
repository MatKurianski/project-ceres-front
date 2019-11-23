import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import CustomText from './../Custom/CustomText'
import { withNavigation } from 'react-navigation'

function CategoryCard({name, image, onPress}) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <CustomText style={styles.title}>
                {name ? name : 'Undefined'}
            </CustomText>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        borderRadius: 5,
        elevation: 3,
        margin: 5,
        backgroundColor: 'white'
    },
    title: {
        backgroundColor: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 16,
        margin: 12
    }
})

export default withNavigation(CategoryCard)