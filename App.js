import React from 'react';
import Login from './components/Pages/Login'
import { StyleSheet, Button, View, ScrollView } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs'

import CustomText from './components/Custom/CustomText'
import LoginButton from './components/Custom/LoginButton'
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

const mainStack = createStackNavigator({
  Main: {
    screen: bottomTabNavigator,
    navigationOptions: () => ({
      headerShown: false
    }),
  },
  Login: {
    screen: Login,
    navigationOptions: () => ({
      headerTransparent: true
    })
  }
})

function Perfil(props) {
  return (
    <View style={{flex: 1, justifyContent:'center', alignItems: 'center'}}>
      <LoginButton navigation={props.navigation} title="Faça login para ver essa página" />
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

export default createAppContainer(mainStack);
