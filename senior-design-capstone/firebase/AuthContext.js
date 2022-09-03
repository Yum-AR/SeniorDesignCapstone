import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebase/clientApp'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  confirmPasswordReset,
  //signInWithApple
} from 'firebase/auth'

export const AuthContext = createContext({
  currentUser: null,
  signInWithGoogle: () => Promise,
  login: () => Promise,
  register: () => Promise,
  logout: () => Promise,
  forgotPassword: () => Promise,
  resetPassword: () => Promise,
})

export const useAuth = () => useContext(AuthContext)

export default function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user ? user : null)
      setLoading(false)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    console.log('The user is', currentUser)
  }, [currentUser])

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function register(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function forgotPassword(email) {
    return sendPasswordResetEmail(auth, email, {
      url: `http://localhost:3000`,
    })
  }

  function resetPassword(oobCode, newPassword) {
    return confirmPasswordReset(auth, oobCode, newPassword)
  }

  function logout() {
    return signOut(auth)
  }

  function signInWithGoogle() {
    const provider = new GoogleAuthProvider()
    return signInWithPopup(auth, provider)
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
    register,
    logout,
    forgotPassword,
    resetPassword,
  }
  return <AuthContext.Provider value={value}>
    {!loading && children}
  </AuthContext.Provider>
}