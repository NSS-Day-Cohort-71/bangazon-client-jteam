import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import CardLayout from '../components/card-layout'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import CartDetail from '../components/order/detail'
import CompleteFormModal from '../components/order/form-modal'
import { completeCurrentOrder, getCart } from '../data/orders'
import { getPaymentTypes } from '../data/payment-types'
import { removeProductFromOrder } from '../data/products'

export default function Cart() {
  const [cart, setCart] = useState(null)  // Set default to null to differentiate from empty
  const [paymentTypes, setPaymentTypes] = useState([])
  const [showCompleteForm, setShowCompleteForm] = useState(false)
  const router = useRouter()

  const refresh = () => {
    getCart().then(cartData => {
      setCart(cartData) // Set cart to the response (it could be null or empty)
    }).catch(() => {
      setCart(null)  // If there's an error (e.g., no cart found), set cart to null
    })
  }

  useEffect(() => {
    refresh()
    getPaymentTypes().then(paymentData => {
      if (paymentData) {
        setPaymentTypes(paymentData)
      }
    })
  }, [])

  const completeOrder = (payment_type) => {
    completeCurrentOrder(cart.id, payment_type).then(() => router.push('/my-orders'))
  }

  const removeProduct = (productId) => {
    removeProductFromOrder(productId).then(refresh)
  }

  return (
    <>
      <CompleteFormModal
        showModal={showCompleteForm}
        setShowModal={setShowCompleteForm}
        paymentTypes={paymentTypes}
        completeOrder={completeOrder}
      />
      <CardLayout title="Your Current Order">
        {cart && cart.lineitems && cart.lineitems.length > 0 ? ( // Check if cart has items
          <>
            <CartDetail cart={cart} removeProduct={removeProduct} />
            <a className="card-footer-item" onClick={() => setShowCompleteForm(true)}>Complete Order</a>
            <a className="card-footer-item">Delete Order</a>
          </>
        ) : (
          // If no items in cart, show message and link to products page
          <div className="has-text-centered">
            <p>Your cart is currently empty.</p>
            <a href="/products" className="button is-primary mt-4">Browse Products</a>
          </div>
        )}
      </CardLayout>
    </>
  )
}

Cart.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      <section className="container">{page}</section>
    </Layout>
  )
}
