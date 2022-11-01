import { createContext, ReactNode, useState, useEffect } from 'react';
import { api } from '../services/apiClient';
import Router from 'next/router';
import { toast } from 'react-toastify';

import { destroyCookie, setCookie, parseCookies } from 'nookies';

type AuthContextData = {
  user: UserProps;
  isAutenticated: boolean;
  sigIn: (creadentials: SigInProps) => Promise<void>;
  signOut: () => void;
  signUp: (credentials: SignUpProps) => Promise<void>;
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

type SignUpProps = {
  name: string;
  email: string;
  password: string;
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

  useEffect(() => {
    const { '@mykitchen.token': token } = parseCookies();

    if(token){
      console.log(token);
      
      api.get('/me').then(res => {
        
        
        const { id, name, email } = res.data;

        setUser({
          id,
          name,
          email
        });
      }).catch((err) => {
        console.log(err);
        signOut();
      })
    }
  }, []);

  async function sigIn({ email, password }: SigInProps){
    try {
      const response = await api.post('/login', {
        email,
        password
      });
      
      const { id, name, token } = response.data;

      setCookie(undefined, '@mykitchen.token', token, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/'
      });

      setUser({
        id,
        name,
        email
      });

      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      toast.success('Logado com sucesso!');

      Router.push('/dashboard');
    } catch (error) {
      toast.error('Email ou senha incorretos');
      console.log(error);
      
    }
  }

  async function signUp({ name, email, password }: SignUpProps){
    try {
      const response = await api.post('/cadastro', {
        name,
        email,
        password
      });

      console.log(response);

      toast.success('Usuario cadastrado com sucesso');

      Router.push('/');
    } catch (error) {
      toast.error('Erro ao cadastrar');
      console.log('Error: ', error); 
    }
  }
  
  return(
    <AuthContext.Provider value={{ user, isAutenticated, sigIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  )
}