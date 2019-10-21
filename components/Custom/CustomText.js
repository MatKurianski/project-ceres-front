import React from 'react'
import { Text } from 'react-native'

export default function CustomText(props) {
    let fontFamily = 'open-sans'
    if(props.bold) fontFamily = 'open-sans-bold'
    
    return(
        <Text style={{fontFamily, ...props.style}}>{props.children}</Text>
    )
}