import React from 'react';
import Login from './components/Pages/Login'
import { View, Text, Alert } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs'

import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'
import * as TaskManager from 'expo-task-manager'
import { Updates } from 'expo'

import { Entypo, Ionicons } from '@expo/vector-icons';

import { AuthContext } from './components/Context/Auth'
import Perfil from './components/Pages/Perfil'
import Config from './components/Pages/Config'
import Register from './components/Pages/Register'
import AdicionarProduto from './components/Pages/AdicionarProduto'
import Products from './components/Pages/Products'

import * as Font from 'expo-font'
import Home from './components/Pages/Home';
import Produto from './components/Pages/Produto';
import { _verificarSeEstaNaEach } from './actions/estaNaEach'

const task = "EACH"

TaskManager.defineTask(task, ({ data: { locations }, error }) => {
  if (error) return;
  const { latitude, longitude } = locations[locations.length-1].coords
  _verificarSeEstaNaEach(latitude, longitude)  
  })

Permissions.askAsync(Permissions.LOCATION)
  .then(res => {
    if(!res) return
    Location.startLocationUpdatesAsync(task, {
      timeInterval: 300000,
      accuracy: Location.Accuracy.High,
      foregroundService: {
        notificationTitle: 'Fique tranquilo!',
        notificationBody: "Só estamos interessados em saber se você está na EACH (:"
      }
    })
  })

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
  Produto: {
    screen: Produto
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

  React.useEffect(() => {
    Updates.checkForUpdateAsync()
      .then(update => {
        if (update.isAvailable) {
          Updates.fetchUpdateAsync()
            .then(() => {
              Alert.alert(
                'Atualização baixada',
                'Deseja instalar agora?',
                [
                  {
                    text: 'Não',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {text: 'Sim', onPress: () => Updates.reloadFromCache()},
                ],
                {cancelable: false},
              );
            });
        }
      })
      .catch(e => {})    
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
