import { AsyncStorage, ToastAndroid } from 'react-native'

export const TOKEN_KEY = "EACherifes";

export const saveToken = async token => {
  await AsyncStorage.setItem(TOKEN_KEY, token)
  ToastAndroid.show('Logado com sucesso!', ToastAndroid.LONG);
};

export const destroyToken = () => AsyncStorage.removeItem(TOKEN_KEY);

export const getAuthToken = () => AsyncStorage.getItem(TOKEN_KEY)

export const isSignedIn = async () => {
  const token = await AsyncStorage.getItem(TOKEN_KEY);

  return (token !== null) ? true : false;
};