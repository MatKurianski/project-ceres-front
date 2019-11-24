import React from 'react'
import { TextInput } from 'react-native'

export default function CustomTextInput(props) {
  let fontFamily = 'ubuntu'
  if(props.bold) fontFamily += '-bold'
  if(props.italic) fontFamily += '-italic'

  const {style, ...otherProps} = props

  return (
    <TextInput style={{fontFamily, ...style}} {...otherProps} />
  )
}