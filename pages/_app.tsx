import React from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

import AuthContextProvider from '../firebase/AuthContext'
import ActiveRestaurantContextProvider from '../src/context/ActiveRestaurantContext'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const MyApp = ({ Component, pageProps }: AppProps) => {
  return <AuthContextProvider>
    <ActiveRestaurantContextProvider>
      <Component {...pageProps} />
    </ActiveRestaurantContextProvider>
  </AuthContextProvider>
}

export default MyApp
