import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import CardLayout from '../../components/card-layout'
import Layout from '../../components/layout'
import Navbar from '../../components/navbar'
import AddPaymentModal from '../../components/payments/payment-modal'
import Table from '../../components/table'
import { addPaymentType, getPaymentTypes, deletePaymentType } from '../../data/payment-types'

export default function Payments() {
  const headers = ['Merchant Name', 'Card Number', '']
  const [payments, setPayments] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [error, setError] = useState(null) // State to track errors

  // Use the useRouter hook to get the id from the URL
  const router = useRouter()
  const { id } = router.query

  const refresh = () => {
    // Check if id is defined and valid (e.g., a number)
    if (id && !isNaN(id)) {
      getPaymentTypes(id)
        .then((data) => {
          if (data) {
            setPayments(data)
            setError(null) // Clear any previous errors
          } else {
            setError('No payment data found.') // Handle no data case
          }
        })
        .catch((err) => {
          console.error('Error fetching payment types:', err)
          setError('Failed to fetch payment types.') // Set error message
        })
    } else {
      setError('Invalid or missing ID.') // Handle invalid or missing ID
    }
  }

  useEffect(() => {
    refresh()
  }, [id]) // Re-run refresh whenever the id changes

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
        {error && <div className="notification is-danger">{error}</div>} {/* Display error message */}
        <Table headers={headers}>
          {
            payments.map(payment => (
              <tr key={payment.id}>
                <td>{payment.merchant_name}</td>
                <td>{payment.obscured_num}</td>
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
      {page}
    </Layout>
  )
}
