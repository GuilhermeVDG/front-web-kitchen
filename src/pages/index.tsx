import { useContext, FormEvent, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import logoImg from '../../public/logo.svg';
import styles from '../../styles/home.module.scss';
import { Input } from '../components/ui/Input';
import { Button } from "../components/ui/Button";
import Link from 'next/link';
import { AuthContext } from "../context/AuthContext";

import  { canSSRGuest } from '../utils/canSSRGuest'

import { toast } from "react-toastify";

export default function Home() {
  const { sigIn } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent){
    event.preventDefault();

    if(email === '' || password === ''){
      toast.error('Preencha todos os campos');
      return;
    }

    setLoading(true);

    await sigIn({ email, password });

    setLoading(false);
  }
  
  return (
    <>
      <Head>
        <title>My Kitchen</title>
      </Head>

      <div className={styles.containerCenter}>
        <Image src={logoImg} alt='Logo' />

        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input placeholder="Digite seu email:" type='text' value={email} onChange={(e) => setEmail(e.target.value)}/>

            <Input placeholder="Digite sua senha:" type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>

            <Button type='submit' loading={loading} >Entrar</Button>
          </form>

          <Link href='/cadastro'>
            <a className={styles.text}>Não possui uma conta? Cadastre-se aqui!</a>
          </Link>
          
        </div>
      </div>
    </>
  )
}

export const  getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {
      
    }
  }
})