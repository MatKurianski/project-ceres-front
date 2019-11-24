import React from 'react';
import Login from './components/Pages/Login'
import { AsyncStorage, View, Text } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs'

import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'
import * as TaskManager from 'expo-task-manager'
import { Notifications } from 'expo'

import { Entypo, Ionicons } from '@expo/vector-icons';

import { AuthContext, TOKEN_KEY } from './components/Context/Auth'
import Perfil from './components/Pages/Perfil'
import Config from './components/Pages/Config'
import Register from './components/Pages/Register'
import AdicionarProduto from './components/Pages/AdicionarProduto'
import Products from './components/Pages/Products'

import * as Font from 'expo-font'
import request from './actions/request';
import Home from './components/Pages/Home';

const task = "EACH"

let estaNaEACH = false
TaskManager.defineTask(task, ({ data: { locations }, error }) => {
  if (error) return;

  const EACH = { lat: 23.4823919, log: -46.502638 }
  const radius = 0.002
  const { latitude, longitude } = locations[locations.length-1].coords
  const abs = Math.abs

  if(abs(latitude - EACH.lat) < radius || abs(longitude - EACH.log) < radius) {
    console.log('Está na EACH!')
    AsyncStorage.getItem(TOKEN_KEY)
      .then(userData => {
        const { token } = JSON.parse(userData)
        if(!token) return
        request('/online', {
          method: 'POST',
          token,
          disableConnectionErrorMessage: true
        }).then(res => console.log(res.data))
          .catch(e => {})
      })
    if(!estaNaEACH) {
      Notifications.presentLocalNotificationAsync({
        title: 'Comidinhas EACH',
        body: "Você está na EACH!"
      })
      estaNaEACH = true
    }
  } else {
    if(estaNaEACH) {
      Notifications.presentLocalNotificationAsync({
        title: 'Comidinhas EACH',
        body: "Você saiu da EACH :("
      })
    }
    estaNaEACH = false
  }
});

const iniciarGeolocalizacao = () => {
  Permissions.askAsync(Permissions.LOCATION)
    .then(res => {
      if(!res) return
      Location.startLocationUpdatesAsync(task, {
        timeInterval: 600000,
      })
    })
}

iniciarGeolocalizacao()

const BottomTabNavigator = createBottomTabNavigator(
  {
    Home: Home,
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
          inactiveTintColor: 'gray',
          labelStyle: {
            fontFamily: 'ubuntu',
            fontSize: 12
          }
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
  console.log(res)

  return () => ({
    title,
    ...res,
    headerTitleStyle: {
      fontFamily: 'ubuntu',
      fontWeight: "200"
    }
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
  },
  Produtos: {
    screen: Products
  }
})

const MainStackWithAuth = props => (
  <AuthContext>
    <MainStack {...props} />
  </AuthContext>
)

MainStackWithAuth.router = MainStack.router;

export default function App (props) {
  const [fontLoaded, setFontLoaded] = React.useState(false)

  React.useEffect(() => {
    if(!fontLoaded) {
      async function loadFont() {
        return await Font.loadAsync({
          'ubuntu': require('./assets/fonts/ubuntu/Ubuntu-Regular.ttf'),
          'ubuntu-bold': require('./assets/fonts/ubuntu/Ubuntu-Bold.ttf'),
          'ubuntu-italic': require('./assets/fonts/ubuntu/Ubuntu-Italic.ttf'),
          'ubuntu-bold-italic': require('./assets/fonts/ubuntu/Ubuntu-BoldItalic.ttf'),
        });
      }
      loadFont().then(() => {
        setFontLoaded(true)
      })
    }
  }, [])
  
  const AppReady = createAppContainer(MainStackWithAuth)

  return fontLoaded  ? <AppReady /> : (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{textAlign: 'center'}}>
        Carregando...
      </Text>
    </View>
  )
}
