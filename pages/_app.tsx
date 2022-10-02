import React from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

import AuthContextProvider from '../firebase/AuthContext';
import ActiveRestaurantContextProvider from '../src/context/ActiveRestaurantContext';

const MyApp = ({ Component, pageProps }: AppProps) => <AuthContextProvider>
  <ActiveRestaurantContextProvider>
    <Component {...pageProps} />
  </ActiveRestaurantContextProvider>
</AuthContextProvider>;

export default MyApp;
