import { useEffect, useState } from 'react'
import Layout from '../../components/layout'
import Navbar from '../../components/navbar'
import { StoreCard } from '../../components/store/card'
import { getStores } from '../../data/stores'
import { ProductCard } from '../../components/product/card'


export default function Stores() {
  const [stores, setStores] = useState([])

  useEffect(() => {
    getStores().then(data => {
      if (data) {
        setStores(data)
      }
    })
  }, [])

  return (
    <>
      <h1 className="title">Stores</h1>
      <div className="store-list">
       {
        stores.map(store => (
          store.products.length > 0 && (
            <div key={store.id} className="store-container">
              <div className="store-card-wrapper">
                <StoreCard store={store} />
              </div>
              <div className="columns is-multiline">
                {store.products.map(product => (
                    <ProductCard product={product} key={product.id}/>
                ))}
              </div>
            </div>
          )
        ))
       } 
      </div>
    </>
  )
}

Stores.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      <section style={{ paddingTop: '4rem' }}>
        {page}
      </section>
    </Layout>
  )
}
