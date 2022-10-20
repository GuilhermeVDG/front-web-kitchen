import Head from "next/head";
import Image from "next/image";
import logoImg from '../../../public/logo.svg';
import styles from '../../../styles/home.module.scss';
import { Input } from '../../components/ui/Input';
import { Button } from "../../components/ui/Button";
import Link from 'next/link';

export default function SignUp() {
  return (
    <>
      <Head>
        <title>My Kitchen</title>
      </Head>

      <div className={styles.containerCenter}>
        <Image src={logoImg} alt='Logo' />

        <div className={styles.login}>
          <h1>Crie sua conta</h1>
          <form>
            <Input placeholder="Digite seu nome:" type='text'/>
            
            <Input placeholder="Digite seu email:" type='text'/>

            <Input placeholder="Digite sua senha:" type='password'/>

            <Button type='submit' loading={false} >Entrar</Button>
          </form>

          <Link href='/'>
            <a className={styles.text}>Já possui uma conta? Faça o login aqui!</a>
          </Link>
          
        </div>
      </div>
    </>
  )
}
