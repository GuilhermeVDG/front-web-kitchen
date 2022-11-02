import { useState, ChangeEvent } from 'react';
import Head from "next/head";
import styles from './styles.module.scss';
import { Header } from "../../components/Header";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { FiUpload } from "react-icons/fi";
import { setupAPIClient } from '../../services/api';
import { api } from '../../services/apiClient';
import { toast } from 'react-toastify';

type ItemProps = {
  id: string;
  name: string;
}

interface CategoryProps {
  categoryList: ItemProps[];
}


export default function Product({ categoryList }: CategoryProps){
  
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  
  const [categories, setCategories] = useState(categoryList || []);
  const [categorySelected, setCategorySelected] = useState(0);
  
  
  const [imageAvatar, setImageAvatar] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState('');

  function handleAvatar(event: ChangeEvent<HTMLInputElement>){
    if(!event.target.files) return;

    const image = event.target.files[0];

    if(!image) return;

    if(image.type === 'image/png' || image.type === 'image/jpeg'){
      setImageAvatar(image);
      setAvatarUrl(URL.createObjectURL(image));
    }
  }

  function handleCategorySelected(event) {
    setCategorySelected(event.target.value);
  }

  async function handleRegister(event){
    event.preventDefault();

    try {
      const data = new FormData();

      if(name === '' || price === '' || description === '' || imageAvatar === null){
        toast.error('Preencha todos os campos');
        return
      }

      data.append('name', name);
      data.append('price', price);
      data.append('description', description);
      data.append('category_id', categories[categorySelected].id);
      data.append('file', imageAvatar);

      await api.post('/product', data);

      toast.success('Produto cadastrado com sucesso')

    } catch (error) {
      console.log(error);
      toast.error('Error ao cadastrar produto');
    }

    setName('');
    setPrice('');
    setDescription('');
    setCategorySelected(0);
    setImageAvatar(null);
    setAvatarUrl('');
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

          <form className={styles.form} onSubmit={handleRegister}>
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
            
            <select value={categorySelected} onChange={handleCategorySelected}>
              {categories.map((item, index) => {
                return(
                  <option key={item.id} value={index}>
                    {item.name}
                  </option>
                )
              })}
            </select>

            <input
            type='text'
            placeholder='Digite o nome do produto'
            className={styles.input}
            value={name}
            onChange={e => setName(e.target.value)}
            />

            <input
            type='text'
            placeholder='Digite o preço do produto'
            className={styles.input}
            value={price}
            onChange={e => setPrice(e.target.value)}
            />

            <textarea
            placeholder="Descrição do produto"
            className={styles.input}
            value={description}
            onChange={e => setDescription(e.target.value)}
            />

            <button className={styles.buttonSubmit} type='submit'>Cadastrar</button>
          </form>
        </main>
      </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async context =>{
  
  const api = setupAPIClient(context);
  
  const response = await api.get('/category');
  
  return{
    props: {
      categoryList: response.data
    }
  }
});

