import React from 'react'
import { Text } from 'react-native'

export default function CustomText(props) {
    let fontFamily = 'ubuntu'
    if(props.bold) fontFamily += '-bold'
    if(props.italic) fontFamily += '-italic'

    const {style, ...otherProps} = props

    return <Text style={{fontFamily, ...style}} {...otherProps}>{props.children}</Text>
}