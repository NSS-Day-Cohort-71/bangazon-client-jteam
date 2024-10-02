import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import CardLayout from '../components/card-layout'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import AddPaymentModal from '../components/payments/payment-modal'
import Table from '../components/table'
import { addPaymentType, getPaymentTypes, deletePaymentType } from '../data/payment-types'

export default function Payments() {
  const headers = ['Merchant Name', 'Card Number', 'Expiration Date', '']
  const [payments, setPayments] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [error, setError] = useState(null) // State to track errors



  useEffect(() => {
    getPaymentTypes()
        .then((data) => {
            setPayments(data)
            setError(null) // Clear any previous errors  
        })
        .catch((err) => {
          console.error('Error fetching payment types:', err)
          setError('Failed to fetch payment types.') // Set error message
        })
  }, []) 

  const addNewPayment = (payment) => {
    addPaymentType(payment)
      .then(() => {
        setShowModal(false)
        refresh()
      })
      .catch((err) => {
        console.error('Error adding payment type:', err)
        setError('Failed to add payment type.') // Set error message
      })
  }

  const removePayment = (paymentId) => {
    deletePaymentType(paymentId)
      .then(() => {
        refresh()
      })
      .catch((err) => {
        console.error('Error deleting payment type:', err)
        setError('Failed to delete payment type.') // Set error message
      })
  }

  return (
    <>
      <AddPaymentModal showModal={showModal} setShowModal={setShowModal} addNewPayment={addNewPayment} />
      <CardLayout title="Your Payment Methods">
        <Table headers={headers}>
          {
            payments.map(payment => (
              <tr key={payment.id}>
                <td>{payment.merchant_name}</td>
                <td>{payment.account_number}</td>
                <td>{payment.expiration_date}</td>
                <td>
                  <span className="icon is-clickable" onClick={() => removePayment(payment.id)}>
                    <i className="fas fa-trash"></i>
                  </span>
                </td>
              </tr>
            ))
          }
        </Table>
        <>
          <a className="card-footer-item" onClick={() => setShowModal(true)}>Add new Payment Method</a>
        </>
      </CardLayout>
    </>
  )
}

Payments.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      <section style={{ paddingTop: '4rem' }}>
        {page}
      </section>
    </Layout>
  )
}
