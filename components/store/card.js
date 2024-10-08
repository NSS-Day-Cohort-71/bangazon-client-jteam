import Link from 'next/link'

export function StoreCard({ store, width= "is-full" }) {
  return (
    <div className={`column ${width}`}>
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">
            {store.name}
          </p>
        </header>
        <div className="card-content">
          <p className="content">
            Owner: {store.customer.first_name} {store.customer.last_name}
          </p>
          <div className="content">
            {store.description}
          </div>
          <div className="content">
            {store.products.length} Items For Sale
          </div>
        </div>
        <footer className="card-footer">
          <Link href={`stores/${store.id}`} className="card-footer-item">View Store</Link>
        </footer>
      </div>
    </div>
  )
}
