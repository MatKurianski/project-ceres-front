import request from './request'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import { AsyncStorage } from 'react-native'
import { Notifications } from 'expo'
import { TOKEN_KEY } from './../components/Context/Auth'

const abs = Math.abs
const radius = 0.0035

export function estaNaEACH(latitude, longitude) {
  const EACH = { lat: -23.4823919, log: -46.502638 }
  return abs(latitude - EACH.lat) < radius && abs(longitude - EACH.log) < radius
}

let _estaNaEACH = false
export async function _verificarSeEstaNaEach(latitude, longitude) {
  AsyncStorage.getItem(TOKEN_KEY)
    .then(userData => {
      if(userData == null) return
      const { token } = JSON.parse(userData)
      if(!token) return

      if(estaNaEACH(latitude, longitude)) {  
        request('/online', {
          method: 'POST',
          token,
          disableConnectionErrorMessage: true
        })
        .then(res => {})
        .catch(e => {})      
        if(!_estaNaEACH) {
          Notifications.presentLocalNotificationAsync({
            title: 'Comidinhas EACH',
            body: "Você está na EACH!"
          })
          _estaNaEACH = true
        }
      } else {
        if(_estaNaEACH) {
          Notifications.presentLocalNotificationAsync({
            title: 'Comidinhas EACH',
            body: "Você saiu da EACH :("
          })
        }
        _estaNaEACH = false
      }})
      .then(res => {})
    .catch(e => {})
}

export async function verificarSeEstaNaEach() {
  const permission = await Permissions.askAsync(Permissions.LOCATION)
  if(permission.status !== 'granted') return

  Location.getCurrentPositionAsync({enableHighAccuracy: true})
    .then(location => {
      const { latitude, longitude } = location
      _verificarSeEstaNaEach(latitude, longitude)
    })
    .catch(e => console.log(e));
}
