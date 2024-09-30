export default function CardLayout({ title, children, width="is-6" }) {
  // Check if children is an array, if not, treat it as a single element
  const content = Array.isArray(children) ? children[0] : children;
  const footer = Array.isArray(children) && children[1] ? children[1] : null;

  return (
    <div className="columns is-centered is-vcentered">
      <div className={`column ${width}`}>
        <div className="card">
          <header className="card-header">
            <h3 className="card-header-title">
              {title}
            </h3>
          </header>
          <div className="card-content">
            <div className="content">
              {content}
            </div>
          </div>
          {footer && (
            <footer className="card-footer">
              {footer}
            </footer>
          )}
        </div>
      </div>
    </div>
  )
}
