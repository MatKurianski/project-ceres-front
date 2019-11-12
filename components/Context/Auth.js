import React from 'react'

const defaultUserData = {
  logged: false,
  nome: undefined,
  email: undefined,
  token: undefined
}

export const AuthCtx = React.createContext()

export function AuthContext(props) {
  const [userData, setUserData] = React.useState(defaultUserData)

  return (
    <AuthCtx.Provider value={{
      userData,
      setUserData
    }} >
      {props.children}
    </AuthCtx.Provider>
  )
}
