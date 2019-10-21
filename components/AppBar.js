import React from 'react';
import Constants from 'expo-constants'
import { StyleSheet, Text, View} from 'react-native';

export default function AppBar() {
  return (
    <View style={styles.AppBar}>
      <Text style={styles.title}>Project Ceres</Text>
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
