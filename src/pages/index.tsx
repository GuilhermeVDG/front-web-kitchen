import { useContext, FormEvent } from "react";
import Head from "next/head";
import Image from "next/image";
import logoImg from '../../public/logo.svg';
import styles from '../../styles/home.module.scss';
import { Input } from '../components/ui/Input';
import { Button } from "../components/ui/Button";
import Link from 'next/link';
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const { sigIn } = useContext(AuthContext);

  async function handleLogin(event: FormEvent){
    event.preventDefault();

    let data = {
      email: 'teste@teste.com',
      password: '213456'
    }

    await sigIn(data);
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
            <Input placeholder="Digite seu email:" type='text'/>

            <Input placeholder="Digite sua senha:" type='password'/>

            <Button type='submit' loading={false} >Entrar</Button>
          </form>

          <Link href='/cadastro'>
            <a className={styles.text}>Não possui uma conta? Cadastre-se aqui!</a>
          </Link>
          
        </div>
      </div>
    </>
  )
}
