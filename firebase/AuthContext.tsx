import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  UserCredential,
  // signInWithApple
} from 'firebase/auth';
import { auth } from './clientApp';

export const AuthContext: React.Context<any> = createContext({
  currentUser: null,
  signInWithGoogle: () => Promise,
  login: () => Promise,
  registerUser: () => Promise,
  logout: () => Promise,
  forgotPassword: () => Promise,
  resetPassword: () => Promise,
});

export const useAuth = (): any => useContext(AuthContext);

const AuthContextProvider: React.FC<{children: any}> = ({ children }) => {
  const [ currentUser, setCurrentUser ] = useState<any>(null);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user != null || null);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    console.log(`The user is`, currentUser);
  }, [ currentUser ]);

  async function login(email: string, password: string): Promise<UserCredential> {
    return await signInWithEmailAndPassword(auth, email, password);
  }

  async function registerUser(email: string, password: string): Promise<UserCredential> {
    return await createUserWithEmailAndPassword(auth, email, password);
  }

  async function forgotPassword(email: string): Promise<void> {
    return await sendPasswordResetEmail(auth, email, {
      url: `http://localhost:3000`,
    });
  }

  async function resetPassword(oobCode: string, newPassword: string): Promise<void> {
    return await confirmPasswordReset(auth, oobCode, newPassword);
  }

  async function logout(): Promise<void> {
    return await signOut(auth);
  }

  async function signInWithGoogle(): Promise<UserCredential> {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(auth, provider);
  }

  const value = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    currentUser,
    signInWithGoogle,
    login,
    registerUser,
    logout,
    forgotPassword,
    resetPassword,
  };
  return <AuthContext.Provider value={value}>
    {!loading && children}
  </AuthContext.Provider>;
};
export default AuthContextProvider;
