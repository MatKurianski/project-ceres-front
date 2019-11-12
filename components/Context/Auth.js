import React from 'react'
import { AsyncStorage, ToastAndroid } from 'react-native'

export const TOKEN_KEY = "EACherifes";

const saveToken = async userData => {
  await AsyncStorage.setItem(TOKEN_KEY, JSON.stringify(userData))
  ToastAndroid.show('Logado com sucesso!', ToastAndroid.LONG);
  ToastAndroid.show(userData.nome, ToastAndroid.SHORT);
  ToastAndroid.show(userData.email, ToastAndroid.SHORT);
  ToastAndroid.show(userData.token, ToastAndroid.SHORT);
};

const destroyToken = () => AsyncStorage.removeItem(TOKEN_KEY);

const defaultUserData = {
  logged: false,
  nome: undefined,
  email: undefined,
  token: undefined
}

export const AuthCtx = React.createContext(defaultUserData)

export function AuthContext(props) {
  const [userData, setUserData] = React.useState(defaultUserData)

  const signIn = userData => {
    saveToken(userData)
    setUserData({logged: true, ...userData})
  }

  const signOut = () => {
    destroyToken()
    setUserData(defaultUserData)
  }

  return (
    <AuthCtx.Provider value={{
      userData,
      setUserData,
      signIn,
      signOut
    }} >
      {props.children}
    </AuthCtx.Provider>
  )
}
