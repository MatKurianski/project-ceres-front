import React from 'react'
import { View, AsyncStorage, Switch } from 'react-native'
import CustomText from './../Custom/CustomText'
import * as Location from 'expo-location'
import { startLocationUpdate } from './../../actions/estaNaEach'

export default function Config() {
  const [location, _setLocationState] = React.useState(false)
  function setLocationState(_value) {
    const value = _value ? 'enabled' : 'disabled'
    AsyncStorage.setItem('geoconfig', value)
    _setLocationState(_value)
  }

  React.useEffect(() => {
    AsyncStorage.getItem('geoconfig')
      .then(res => {
        if(res === 'enabled') setLocationState(true)
        else setLocationState(false)
      })
  }, [])

  React.useEffect(() => {
    if(location) startLocationUpdate()
    else Location.stopLocationUpdatesAsync('EACH').catch(e => {})
  }, [location])


  return (
    <View style={{flex: 1, justifyContent:'center', alignItems: 'center'}}>
      <CustomText>Habilitar/desabilitar geolocalização</CustomText>
      <Switch value={location} onValueChange={value => setLocationState(value)} />
    </View>
  )
}