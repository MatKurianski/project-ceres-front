import React from 'react';
import Constants from 'expo-constants'
import { StyleSheet, View, Text, ScrollView } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs'

import AppBar from './components/AppBar'
import SearchBar from './components/SearchBar'

import OnlineSellersSection from './components/Sections/OnlineSellersSection'
import CategoriesSection from './components/Sections/CategoriesSection'

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
            <Text>Meu perfil aqui</Text>
        </View>
    )
}

function Config() {
    return (
        <View style={{flex: 1, justifyContent:'center', alignItems: 'center'}}>
            <Text>Configurações aqui</Text>
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
      <ScrollView>
        <AppBar />
        <SearchBar />
        <CategoriesSection title="Categorias" horizontal={true} />
        <OnlineSellersSection />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
  },
  title: {
      fontSize: 28
  }
});

export default createAppContainer(bottomTabNavigator)
