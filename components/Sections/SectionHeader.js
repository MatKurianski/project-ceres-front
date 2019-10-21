import React from 'react'
import { StyleSheet } from 'react-native'
import CustomText from './../Custom/CustomText'

export default function SectionHeader({children, style, ...otherProps}) {
    return (
        <CustomText bold={true} style={{...style, ...styles.text}} {...otherProps} >
            {children}
        </CustomText>
    )
}

const styles = StyleSheet.create({
    text: {
        marginVertical: 15,
        marginHorizontal: 5,
        fontSize: 14
    },
})