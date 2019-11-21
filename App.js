import React from 'react';
import Login from './components/Pages/Login'
import { StyleSheet, AsyncStorage, View, ScrollView } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs'

import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'
import * as TaskManager from 'expo-task-manager'
import { Notifications } from 'expo'

import AppBar from './components/AppBar'
import SearchBar from './components/SearchBar'

import CategoriesSection from './components/Sections/CategoriesSection'
import Sections from './components/Sections/Sections'

import { Entypo, Ionicons } from '@expo/vector-icons';

import { AuthContext, AuthCtx, TOKEN_KEY } from './components/Context/Auth'
import Perfil from './components/Pages/Perfil'
import Config from './components/Pages/Config'
import Register from './components/Pages/Register'
import AdicionarProduto from './components/Pages/AdicionarProduto'

import * as Font from 'expo-font'

const task = "EACH"
TaskManager.defineTask(task, ({data: {eventType, region}, error}) => {
  if(error){
    console.log(error)
    return
  }
  console.log('Ação engatilhada')
  if (eventType === Location.GeofencingEventType.Enter) {
    Notifications.presentLocalNotificationAsync({
      title: 'Comidinhas EACH',
      body: "Você está na EACH!"
    })
  } else if (eventType === Location.GeofencingEventType.Exit) {
    Notifications.presentLocalNotificationAsync({
      title: 'Comidinhas EACH',
      body: "Você saiu da EACH!"
    })
  }
})

const iniciarGeolocalizacao = () => {
  Permissions.askAsync(Permissions.LOCATION)
    .then(res => {
      if(!res) return
      Location.startGeofencingAsync(task, [
        {
          // Coordenadas da EACH
          latitude: -23.4823919,
          longitude: -46.5026385,
          radius: 1000,
        }
      ])
    })
}

iniciarGeolocalizacao()

const BottomTabNavigator = createBottomTabNavigator(
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

const backWhiteHeader = () => ({
  headerStyle: {
    borderBottomWidth: 0,
    elevation: 0
  }
})

const backWhiteHeaderAndTitle = (title) => {
  const res = backWhiteHeader()

  return () => ({
    title,
    ...res
  })
}

const MainStack = createStackNavigator({
  Main: {
    screen: BottomTabNavigator,
    navigationOptions: () => ({
      headerShown: false
    }),
  },
  Login: {
    screen: Login,
    navigationOptions: backWhiteHeader
  },
  Register: {
    screen: Register,
    navigationOptions: backWhiteHeader
  },
  AdicionarProduto: {
    screen: AdicionarProduto,
    navigationOptions: backWhiteHeaderAndTitle('Adicionando produto')
  }
})

const MainStackWithAuth = props => (
  <AuthContext>
    <MainStack {...props} />
  </AuthContext>
)

MainStackWithAuth.router = MainStack.router;

function App() {
  const [fontLoaded, setFontLoaded] = React.useState(false)
  const { setUserData } = React.useContext(AuthCtx)

  React.useEffect(() => {
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

      AsyncStorage.getItem(TOKEN_KEY)
        .then(item => {
          itemObject = JSON.parse(item)
          if (itemObject === null) return
          setUserData({logged: true, ...itemObject})
        })
        .catch(e => {})
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

export default createAppContainer(MainStackWithAuth);
