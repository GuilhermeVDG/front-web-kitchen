import { createContext, ReactNode, useState } from 'react';

type AuthContextData = {
  user: UserProps;
  isAutenticated: boolean;
  sigIn: (creadentials: SigInProps) => Promise<void>;
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

export function AuthProvider({ children }: AuthProviderProps){
  
  const [user, setUser] = useState<UserProps>();
  const isAutenticated = !!user;

  async function sigIn(){
    alert('teste');
  }
  
  return(
    <AuthContext.Provider value={{ user, isAutenticated, sigIn}}>
      {children}
    </AuthContext.Provider>
  )
}