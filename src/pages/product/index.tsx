import { useState, ChangeEvent } from 'react';
import Head from "next/head";
import styles from './styles.module.scss';
import { Header } from "../../components/Header";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { FiUpload } from "react-icons/fi";

export default function Product(){
  const [imageAvatar, setImageAvatar] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState('');

  function handleAvatar(event: ChangeEvent<HTMLInputElement>){
    if(!event.target.files) return;

    const image = event.target.files[0];

    if(!image) return;

    if(image.type === 'image/png' || image.type === 'image.jpeg'){
      setImageAvatar(image);
      setAvatarUrl(URL.createObjectURL(image));
    }
  }
  
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
            <label className={styles.labelAvatar}>
              <span>
                <FiUpload size={25} color='#fff'/>
              </span>

              <input type='file' accept='image/png, image/jpeg' onChange={handleAvatar}/>

              {avatarUrl && (
                <img
                src={avatarUrl}
                alt="Imagem do produto"
                height={250}
                width={250}
                className={styles.preview}
              />
              )}
            </label>
            
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

