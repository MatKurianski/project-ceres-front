import { AsyncStorage, ToastAndroid } from 'react-native'

export const TOKEN_KEY = "EACherifes";

export const saveToken = async userData => {
  await AsyncStorage.setItem(TOKEN_KEY, JSON.stringify(userData))
  ToastAndroid.show('Logado com sucesso!', ToastAndroid.LONG);
  ToastAndroid.show(userData.nome, ToastAndroid.SHORT);
  ToastAndroid.show(userData.email, ToastAndroid.SHORT);
  ToastAndroid.show(userData.token, ToastAndroid.SHORT);
};

export const destroyToken = () => AsyncStorage.removeItem(TOKEN_KEY);

export const getAuthToken = () => AsyncStorage.getItem(TOKEN_KEY)

export const isSignedIn = async () => {
  const token = await AsyncStorage.getItem(TOKEN_KEY);

  return (token !== null) ? true : false;
};