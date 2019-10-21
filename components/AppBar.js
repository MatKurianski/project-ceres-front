import React from 'react';
import { StyleSheet, View} from 'react-native';
import CustomText from './Custom/CustomText'

export default function AppBar() {
  return (
    <View style={styles.AppBar}>
      <CustomText bold={true} style={styles.title}>Project Ceres</CustomText>
    </View>
  );
}

const styles = StyleSheet.create({
  AppBar: {
    backgroundColor: '#fff',
    paddingTop: 15,
    padding: 15,
    fontWeight: 'bold'
  },

  title: {
      fontSize: 28,
      textAlignVertical: "center"
  }
});
