import { useState, FormEvent } from 'react';
import Head from "next/head";
import { Header } from '../../components/Header';
import styles from './styles.module.scss';
import { api } from '../../services/apiClient';
import { toast } from 'react-toastify'; 
import { canSSRAuth } from '../../utils/canSSRAuth';

export default function Category(){
  const [ category, setCategory ] = useState('');

  async function handleRegister(e: FormEvent){
    e.preventDefault();

    if(category === ''){
      toast.error('Preencha o nome da catrgoria');
      return;
    }

    const res = await api.post('/category', {
      name: category
    });

    console.log(res);
    



    toast.success('Categoria cadastrada com sucesso');
    setCategory('');
  }
  
  return(
    <>
      <Head>
        <title>My Kitchen - Nova Categoria</title>
      </Head>
      <div>
        <Header/>
          
        <main className={styles.container}>
          <h1>Cadastrar nova categoria</h1>

          <form className={styles.form} onSubmit={handleRegister}>
            <input
            type='text'
            placeholder='Digite o nome da nova categoria'
            className={styles.input}
            value={category}
            onChange={e => setCategory(e.target.value)}
            />

            <button type="submit" className={styles.buttonSubmit}>Cadastrar</button>
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