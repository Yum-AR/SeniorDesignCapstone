import '../styles/globals.css'
import type { AppProps } from 'next/app'

import AuthContextProvider from '../firebase/AuthContext'
import ActiveRestaurantContextProvider from '../src/context/ActiveRestaurantContext'


function MyApp({ Component, pageProps }: AppProps) {
  return <AuthContextProvider>
    <ActiveRestaurantContextProvider>
      <Component {...pageProps} />
    </ActiveRestaurantContextProvider>
  </AuthContextProvider>
}

export default MyApp
