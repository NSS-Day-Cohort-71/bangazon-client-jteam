import { useEffect, useState } from 'react'
import Filter from '../components/filter'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { ProductCard } from '../components/product/card'
import { getProducts } from '../data/products'

export default function Products() {
  const [categories, setCategories] = useState([])  // Store category-wise products
  const [filteredProducts, setFilteredProducts] = useState([])  // Store filtered products
  const [isLoading, setIsLoading] = useState(true)
  const [loadingMessage, setLoadingMessage] = useState("Loading products...")
  const [locations, setLocations] = useState([])

  useEffect(() => {
    getProducts().then(data => {
      if (data) {
        if (data.header === "Products matching filters") {
          setFilteredProducts(data.products)
          setCategories([])  // Clear categories if filters are applied
        } else {
          setCategories(data)
          setFilteredProducts([])  // Clear filtered products if no filters
        }

        // Extract unique locations for the filter
        const locationData = [...new Set(data.map(category => category.products.map(product => product.location)).flat())]
        const locationObjects = locationData.map(location => ({
          id: location,
          name: location
        }))
        setLocations(locationObjects)
        setIsLoading(false)
      }
    }).catch(err => {
      setLoadingMessage(`Unable to retrieve products. Status code ${err.message} on response.`)
    })
  }, [])

  const searchProducts = (event) => {
    getProducts(event).then(data => {
      if (data.header === "Products matching filters") {
        setFilteredProducts(data.products)
        setCategories([])  // Clear categories when filtering
      } else {
        setCategories(data)
        setFilteredProducts([])  // Clear filtered products if no filters
      }
    })
  }

  if (isLoading) return <p>{loadingMessage}</p>

  return (
    <>
      <Filter productCount={filteredProducts.length || categories.reduce((sum, category) => sum + category.products.length, 0)} onSearch={searchProducts} locations={locations} />

      {/* Render filtered products if filters are applied */}
      {filteredProducts.length > 0 && (
        <div>
          <h2 className="title">Products matching filters</h2>
          <div className="columns is-multiline">
            {filteredProducts.map(product => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        </div>
      )}

      {/* Render categories and products if no filters */}
      {categories.length > 0 && (
        <div>
          {categories.map(category => (
            <div key={category.category}>
              <h2 className="title">{category.category}</h2>
              <div className="columns is-multiline">
                {category.products.map(product => (
                  <ProductCard product={product} key={product.id} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

Products.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      <section style={{ paddingTop: '4rem' }}>
        {page}
      </section>
    </Layout>
  )
}
