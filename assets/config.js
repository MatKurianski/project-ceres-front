const getApiUrl = () => {
  if(__DEV__) return 'http://192.168.1.18:3000'
  else return 'LINK DA AMAZON AQUI'
}

export {
  getApiUrl
}