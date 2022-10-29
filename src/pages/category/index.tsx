import Head from "next/head";
import { Header } from '../../components/Header';
import styles from './styles.module.scss';

export default function Category(){
  return(
    <>
      <Head>
        <title>My Kitchen - Nova Categoria</title>
      </Head>
      <div>
        <Header/>
          
        <main className={styles.container}>
          <h1>Cadastrar nova categoria</h1>

          <form className={styles.form}>
            <input
            type='text'
            placeholder='Digite o nome da nova categoria'
            className={styles.input}
            />

            <button type="submit" className={styles.buttonSubmit}>Cadastrar</button>
          </form>
        </main>
      </div>
    </>
  )
}