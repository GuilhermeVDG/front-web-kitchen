import { useState, FormEvent } from "react";
import Head from "next/head";
import Image from "next/image";
import logoImg from '../../../public/logo.svg';
import styles from '../../../styles/home.module.scss';
import { Input } from '../../components/ui/Input';
import { Button } from "../../components/ui/Button";
import Link from 'next/link';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleSignUp(event: FormEvent){
    event.preventDefault();

    if(name === '' || email === '' || password === ''){
      alert('PREENCHA OS CAMPOS');
      return;
    }

    setLoading(true);
  }

  return (
    <>
      <Head>
        <title>My Kitchen</title>
      </Head>

      <div className={styles.containerCenter}>
        <Image src={logoImg} alt='Logo' />

        <div className={styles.login}>
          <h1>Crie sua conta</h1>
          <form onSubmit={handleSignUp}>
            <Input placeholder="Digite seu nome:" type='text' value={name} onChange={(e) => setName(e.target.value)}/>
            
            <Input placeholder="Digite seu email:" type='text' value={email} onChange={(e) => setEmail(e.target.value)}/>

            <Input placeholder="Digite sua senha:" type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>

            <Button type='submit' loading={loading} >Entrar</Button>
          </form>

          <Link href='/'>
            <a className={styles.text}>Já possui uma conta? Faça o login aqui!</a>
          </Link>
          
        </div>
      </div>
    </>
  )
}
