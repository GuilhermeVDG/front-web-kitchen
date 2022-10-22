import { createContext, ReactNode, useState } from 'react';
import Router from 'next/router';

import { destroyCookie } from 'nookies';

type AuthContextData = {
  user: UserProps;
  isAutenticated: boolean;
  sigIn: (creadentials: SigInProps) => Promise<void>;
  signOut: () => void;
}

type UserProps = {
  id: string;
  name: string;
  email: string;
}

type SigInProps = {
  email: string;
  password: string;
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function signOut(){
  try {
    destroyCookie(undefined, '@mykitchen.token');
    Router.push('/');
  } catch{
    console.log('error to signout')
  }
}

export function AuthProvider({ children }: AuthProviderProps){
  
  const [user, setUser] = useState<UserProps>();
  const isAutenticated = !!user;

  async function sigIn({ email, password }: SigInProps){
    alert(`email: ${email} senha: ${password}`);
  }
  
  return(
    <AuthContext.Provider value={{ user, isAutenticated, sigIn, signOut}}>
      {children}
    </AuthContext.Provider>
  )
}