import { useState } from 'react';
import { canSSRAuth } from "../../utils/canSSRAuth"
import Head from "next/head"
import { Header } from "../../components/Header"
import styles from './styles.module.scss';
import { FiRefreshCcw } from "react-icons/fi";
import { setupAPIClient } from "../../services/api";
import { api } from '../../services/apiClient';
import Modal from 'react-modal';
import { ModalOrder } from '../../components/ModalOrder'

type OrderProps = {
  id: string;
  table: string | number;
  status: boolean;
  draft: boolean;
  name: string | null
}

export type OrderItemProps = {
  id: string;
  amount: number;
  order_id: string;
  product_id;
  product: {
    id: string;
    name: string;
    description: string;
    price: string;
    banner: string;
  }
  order: {
    id: string;
    table: string | number;
    status: boolean;
    name: string | null;
  }
}

interface HomeProps{
  listOrders: OrderProps[];
}

export default function Dashboard({ listOrders }: HomeProps){
  const [orderList, setOrderList] = useState(listOrders || []);

  const [modalItem, setModalItem] = useState<OrderItemProps[]>();
  const [modalVisible, setModalVisible] = useState(false);

  async function handleOpenModalView(id: string){
    const response = await api.get('/order/detail', {
      params: {
        order_id: id
      }
    });

    setModalItem(response.data);
    setModalVisible(true);
  }
  
  function handleCloseModal(){
    setModalVisible(false);
  }

  Modal.setAppElement('#__next');
  
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
            <button onClick={() => handleOpenModalView(item.id)}>
              <div className={styles.tag}></div>
              <span>Mesa {item.table}</span>
            </button>
          </section>
        ))}
      
      </article>
    </main>

    { modalVisible && (
      <ModalOrder
        isOpen={modalVisible}
        onRequestClose={handleCloseModal}
        order={modalItem}
      />
    ) }

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