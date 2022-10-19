import Head from "next/head";
import Image from "next/image";
import logoImg from '../../public/logo.svg';
import styles from '../../styles/home.module.scss';
import { Input } from '../components/ui/Input';
import { Button } from "../components/ui/Button";

export default function Home() {
  return (
    <>
      <Head>
        <title>My Kitchen</title>
      </Head>

      <div className={styles.containerCenter}>
        <Image src={logoImg} alt='Logo' />

        <div className={styles.login}>
          <form>
            <Input placeholder="Digite seu email:" type='text'/>

            <Input placeholder="Digite sua senha:" type='password'/>

            <Button type='submit' loading={false} >Entrar</Button>
          </form>

          <a className={styles.text}>Não possui uma conta? Cadastre-se aqui!</a>
        </div>
      </div>
    </>
  )
}
