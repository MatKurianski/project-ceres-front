import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Rating } from 'react-native-ratings'
import CustomText from '../Custom/CustomText'

export default function AvaliacaoCard(props) {
  return(
    <View style={styles.container}>
      <Rating 
        imageSize={30}
        type="heart"
        startingValue={props.nota}
        ratingCount={5}
        readonly
      />
      <CustomText style={{marginTop: 20}}>
        {props.comentario}
      </CustomText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    width: '100%',
    alignItems: 'center',
    paddingVertical: 25,
    marginBottom: 30
  }
})