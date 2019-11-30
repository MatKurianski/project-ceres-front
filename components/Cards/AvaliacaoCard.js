import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Rating } from 'react-native-ratings'
import CustomText from '../Custom/CustomText'

export default function AvaliacaoCard(props) {
  <View style={styles.container}>
    <Rating 
      imageSize={30}
      type="heart"
      startingValue={1}
      ratingCount={5}
      readonly
    />
    <CustomText>
      salve
    </CustomText>
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    width: '100%',
    alignItems: 'center'
  }
})