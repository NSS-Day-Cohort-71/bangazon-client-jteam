import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useUserQuery } from "../context/userQueries";

export default function Navbar() {
  const { user, setUserToken } = useUserQuery();
  const hamburger = useRef();
  const navbar = useRef();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  const showMobileNavbar = () => {
    hamburger.current.classList.toggle('is-active')
    navbar.current.classList.toggle('is-active')
  }

  const closeMobileNavbar = () => {
    // Only collapse if navbar is currently active
    if (navbar.current.classList.contains('is-active')) {
      hamburger.current.classList.remove('is-active')
      navbar.current.classList.remove('is-active')
    }
  }

  const getLoggedInButtons = () => {
    return (
      <div className="navbar-item has-dropdown is-hoverable">
        <a className="navbar-link">
          <span className="icon">
            <i className="fas fa-user-circle is-medium"></i>
          </span>
        </a>
        <div className="navbar-dropdown is-right">
          <Link href="/cart" className="navbar-item" onClick={showMobileNavbar}>Cart</Link>
          <Link href="/my-orders" className="navbar-item" onClick={closeMobileNavbar}>My Orders</Link>
          <Link href="/payments/" className="navbar-item" onClick={closeMobileNavbar}>Payment Methods</Link>
          <Link href="/profile" className="navbar-item" onClick={closeMobileNavbar}>Profile</Link>
          {
            profile.store ?
              <>
                <Link legacyBehavior href={`/stores/${profile.store.id}`}><a className="navbar-item" onClick={closeMobileNavbar}>View Your Store</a></Link>
                <Link href="/products/new" className="navbar-item" onClick={closeMobileNavbar}>Add a new Product</Link>
              </>
              :
              <Link href="/stores/new" className="navbar-item" onClick={closeMobileNavbar}>Interested in selling?</Link>
          }
          <hr className="navbar-divider"></hr>
          <Link legacyBehavior href="/login">
            <a className="navbar-item" onClick={
              () => {
                setUserToken(Null)
                setIsLoggedIn(false)
                closeMobileNavbar()
              }}
            >
              Log out
            </a>
          </Link>
        </div>
      </div>
    );
  };

  const getLoggedOutButtons = () => {
    return (
      <div className="navbar-item">
        <div className="buttons">
          <Link href="/register" className="button is-primary">
            <strong>Sign up</strong>
          </Link>
          <Link href="/login" className="button is-light">
            Log in
          </Link>
        </div>
      </div>
    );
  };

  return (
    <nav
      className="navbar mb-3 is-warning px-5 is-fixed-top is-top"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link href="/">
          <img
            src="/images/logo.png"
            alt="Logo"
            style={{ width: "4rem", height: "4rem" }}
            className="relative"
          />
        </Link>

        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          ref={hamburger}
          onClick={showMobileNavbar}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div className="navbar-menu" ref={navbar}>
        <div className="navbar-start">
          <Link href="/" className="navbar-item" onClick={closeMobileNavbar}>Products</Link>
          <Link href="/stores" className="navbar-item" onClick={closeMobileNavbar}>Stores</Link>
        </div>
        <div className="navbar-end">
          {isLoggedIn ? getLoggedInButtons() : getLoggedOutButtons()}
        </div>
      </div>
    </nav>
  );
}
