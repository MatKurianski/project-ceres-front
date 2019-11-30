import axios from 'axios'
import { getApiUrl } from './../assets/config'
import { ToastAndroid } from 'react-native'

export default function request(route, options={}) {
  let { method, token, formdata, query, body, disableConnectionErrorMessage} = options
  let contentType =  'application/json'
  if(formdata) contentType = "multipart/form-data; charset=utf-8;"
  route = getApiUrl() + route
  if(query) route = route+query

  let req = axios.get 
  if(method === 'POST') req = axios.post
  else if (method === 'PUT') req = axios.put
  else if(method === 'DELETE') req = axios.delete

  return new Promise(async (resolve, reject) => {
    try {
      if(method === 'DELETE' || method === 'GET') {
        resolve(
          await req(route, {
            headers: {
              token,
              'Content-Type': contentType
            },
            timeout: 5000
          })
        )
      } else {
        resolve(
          await req(route, body, {
            headers: {
              token,
              'Content-Type': contentType
            },
            timeout: 5000
          })
        )
      }
    } catch(e) {
      if(disableConnectionErrorMessage) ToastAndroid.show('Erro de conexão', ToastAndroid.SHORT)
      reject(e)
    }
  })
}