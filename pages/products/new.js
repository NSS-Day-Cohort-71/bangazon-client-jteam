import { useRouter } from 'next/router'
import { useRef } from 'react'
import cookie from 'cookie'

import Layout from '../../components/layout'
import Navbar from '../../components/navbar'
import { addProduct } from '../../data/products'
import ProductForm from '../../components/product/form'

export async function getServerSideProps(context) {
  const cookies = cookie.parse(context.req ? context.req.headers.cookie || '' : '');

  // Retrieve the token from the cookies
  const token = cookies.token;

  const response = await fetch(`http://localhost:8000/productcategories`, {
    headers: {
      Authorization: `Token ${token}`
    }
  })

  const categories = await response.json()
  return { props: { categories } }
}

export default function NewProduct({ categories }) {
  const formEl = useRef()
  const router = useRouter()

  const saveProduct = () => {
    const { name, description, price, category, location, quantity } = formEl.current
    const product = {
      name: name.value,
      description: description.value,
      price: price.value,
      categoryId: category.value,
      location: location.value,
      quantity: quantity.value
    }
    addProduct(product).then((res) => router.push(`/products/${res.id}`))
  }

  return (
    <ProductForm
      formEl={formEl}
      saveEvent={saveProduct}
      title="Add a new product"
      router={router}
      categories={categories}
    ></ProductForm>
  )
}

NewProduct.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  )
}
