import Head from "next/head";
import styles from './styles.module.scss';
import { Header } from "../../components/Header";
import { canSSRAuth } from "../../utils/canSSRAuth";

export default function Product(){
  return(
    <>
      <Head>
        <title>My Kitchen - Cadastro de produtos</title>
      </Head>

      <div>
        <Header/>

        <main className={styles.container}>
          <h1>Novo produto</h1>

          <form className={styles.form}>
            <select>
              <option>Categoria 1</option>
              <option>Categoria 2</option>
            </select>

            <input
            type='text'
            placeholder='Digite o nome do produto'
            className={styles.input}
            />

            <input
            type='text'
            placeholder='Digite o preço do produto'
            className={styles.input}
            />

            <textarea
            placeholder="Descrição do produto"
            className={styles.input}
            />

            <button className={styles.buttonSubmit} type='submit'>Cadastrar</button>
          </form>
        </main>
      </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async context =>{
  return{
    props: {}
  }
})

