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

import SearchBar from './components/SearchBar'

import CategoriesSection from './components/Sections/CategoriesSection'
import SectionHeader from './components/Sections/SectionHeader'

import { Entypo, Ionicons } from '@expo/vector-icons';

import { AuthContext, AuthCtx, TOKEN_KEY } from './components/Context/Auth'
import Perfil from './components/Pages/Perfil'
import Config from './components/Pages/Config'
import Register from './components/Pages/Register'
import AdicionarProduto from './components/Pages/AdicionarProduto'
import Products from './components/Pages/Products'

import * as Font from 'expo-font'

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
    if(!estaNaEACH) {
      Notifications.presentLocalNotificationAsync({
        title: 'Comidinhas EACH',
        body: "Você está na EACH!"
      })
      estaNaEACH = true
    }
  } else estaNaEACH = false
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
  },
  Produtos: {
    screen: Products,
    // navigationOptions: backWhiteHeaderAndTitle('Produtos')
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
        <SearchBar />
        <CategoriesSection />
        <SectionHeader>
          Todos os produtos
        </SectionHeader>
        <Products />
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
