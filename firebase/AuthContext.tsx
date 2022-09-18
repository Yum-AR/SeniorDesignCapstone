import React, { Context, createContext, useContext, useEffect, useState } from 'react'
import { auth } from './clientApp'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  confirmPasswordReset,
  UserCredential
  // signInWithApple
} from 'firebase/auth'
import { String } from 'aws-sdk/clients/batch'

export const AuthContext: React.Context<any> = createContext({
  currentUser: null,
  signInWithGoogle: () => Promise,
  login: () => Promise,
  registerUser: () => Promise,
  logout: () => Promise,
  forgotPassword: () => Promise,
  resetPassword: () => Promise
})

export const useAuth = (): any => useContext(AuthContext)

const AuthContextProvider: React.FC<{children: any}> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser((user != null) || null)
      setLoading(false)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    console.log('The user is', currentUser)
  }, [currentUser])

  async function login (email: string, password: string): Promise<UserCredential> {
    return await signInWithEmailAndPassword(auth, email, password)
  }

  async function registerUser (email: string, password: string): Promise<UserCredential> {
    return await createUserWithEmailAndPassword(auth, email, password)
  }

  async function forgotPassword (email: String): Promise<void> {
    return await sendPasswordResetEmail(auth, email, {
      url: 'http://localhost:3000'
    })
  }

  async function resetPassword (oobCode: String, newPassword: String): Promise<void> {
    return await confirmPasswordReset(auth, oobCode, newPassword)
  }

  async function logout (): Promise<void> {
    return await signOut(auth)
  }

  async function signInWithGoogle (): Promise<UserCredential> {
    const provider = new GoogleAuthProvider()
    return await signInWithPopup(auth, provider)
  }
  /*
  export function signInWithApple() {
      const provider = new firebase.auth.OAuthProvider('apple.com');
      const result = await auth.signInWithPopup(provider);

      console.log(result.user); // logged-in Apple user
      return(result)
  } */

  const value = {
    currentUser,
    signInWithGoogle,
    login,
    registerUser,
    logout,
    forgotPassword,
    resetPassword
  }
  return <AuthContext.Provider value={value}>
    {!loading && children}
  </AuthContext.Provider>
}
export default AuthContextProvider
