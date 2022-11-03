import { canSSRAuth } from "../../utils/canSSRAuth"
import Head from "next/head"
import { Header } from "../../components/Header"
import styles from './styles.module.scss';
import { FiRefreshCcw } from "react-icons/fi";

export default function Dashboard(){
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
        
        <section className={styles.orderItem}>
          <button>
            <div className={styles.tag}></div>
            <span>Mesa tal</span>
          </button>
        </section>
      
      </article>
    </main>

    </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async ctx => {
  return {
    props: {
      
    }
  }
})