import React from 'react';
import Constants from 'expo-constants'
import { StyleSheet, View, ScrollView } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs'

import CustomText from './components/Custom/CustomText'
import AppBar from './components/AppBar'
import SearchBar from './components/SearchBar'

import CategoriesSection from './components/Sections/CategoriesSection'
import Sections from './components/Sections/Sections'

import { Entypo, Ionicons } from '@expo/vector-icons';

import * as Font from 'expo-font'

const bottomTabNavigator = createBottomTabNavigator(
  {
    Home: App,
    Perfil: Perfil,
    Config: Config
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({tintColor}) => {
        const { routeName } = navigation.state

        let iconName = undefined
        let IconComponent = undefined

        switch(routeName) {
          case 'Perfil':
            iconName = 'md-people'
            IconComponent = Ionicons
            break
          case 'Home':
            iconName = 'home'
            IconComponent = Entypo
            break
          case 'Config':
            iconName = 'ios-settings'
            IconComponent = Ionicons
            break
        }
        return (<IconComponent name={iconName} size={25} color={tintColor} />);
        },
        tabBarOptions: {
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray'
        },
    }),
  },
  {
    initialRouteName: 'Home'
  },
);

function Perfil() {
  return (
    <View style={{flex: 1, justifyContent:'center', alignItems: 'center'}}>
      <CustomText>Meu perfil aqui</CustomText>
    </View>
  )
}

function Config() {
  return (
    <View style={{flex: 1, justifyContent:'center', alignItems: 'center'}}>
      <CustomText>Configurações aqui</CustomText>
    </View>
  )
}

function App() {
  const [fontLoaded, setFontLoaded] = React.useState(false)

  React.useEffect( () => {
    if(!fontLoaded) {
      async function loadFont() {
        return await Font.loadAsync({
          'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
          'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
          'open-sans-italic': require('./assets/fonts/OpenSans-Italic.ttf'),
          'open-sans-bold-italic': require('./assets/fonts/OpenSans-BoldItalic.ttf'),
        });
      }
      loadFont().then(() => {
        setFontLoaded(true)
      })
    }
  }, [])

  if(!fontLoaded) return null

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AppBar />
        <SearchBar />
        <CategoriesSection />
        <Sections />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 8
  },
  title: {
      fontSize: 28
  }
});

export default createAppContainer(bottomTabNavigator)
