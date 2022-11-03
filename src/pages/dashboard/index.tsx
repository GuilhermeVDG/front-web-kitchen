import { useState } from 'react';
import { canSSRAuth } from "../../utils/canSSRAuth"
import Head from "next/head"
import { Header } from "../../components/Header"
import styles from './styles.module.scss';
import { FiRefreshCcw } from "react-icons/fi";
import { setupAPIClient } from "../../services/api";

type OrderProps = {
  id: string;
  table: string | number;
  status: boolean;
  draft: boolean;
  name: string | null
}

interface HomeProps{
  listOrders: OrderProps[];
}

export default function Dashboard({ listOrders }: HomeProps){
  const [orderList, setOrderList] = useState(listOrders || []);
  
  
  return(
    <>
    <Head>
      <title>My Kitchen</title>
    </Head>

    <div>
      <Header/>
      
    <main className={styles.container}>
      <div className={styles.containerHeader}>
        <h1>Pedidos em aberto</h1>
        <button>
          <FiRefreshCcw size={25} color='#3FFFA3'/>
        </button>
      </div>

      <article className={styles.listOrders}>
        
        {orderList.map(item => (
          <section key={item.id} className={styles.orderItem}>
            <button>
              <div className={styles.tag}></div>
              <span>Mesa {item.table}</span>
            </button>
          </section>
        ))}
      
      </article>
    </main>

    </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async ctx => {
  const api = setupAPIClient(ctx);

  const response = await api.get('/order/list');
  
  
  return {
    props: {
      listOrders: response.data
    }
  }
})