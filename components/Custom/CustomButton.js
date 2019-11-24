import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import CustomText from './CustomText'

export default function CustomButton(props) {
  const {style, textStyle, title, children,...otherProps} = props

  return (
    <TouchableOpacity style={styles.button} {...otherProps}>
      <CustomText bold={true} style={{color: 'white', fontSize: 14, textAlign: 'center', lineHeight: 15,textAlignVertical: 'center',...textStyle}} >
        {title ? title.toUpperCase() : children}
      </CustomText>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 18,
    paddingVertical: 9,
    backgroundColor: 'tomato',
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: 'grey'
  }
})