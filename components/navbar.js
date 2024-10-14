import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useUserQuery } from "../context/userQueries";

export default function Navbar() {
  const { user, setUserToken } = useUserQuery();
  const hamburger = useRef();
  const navbar = useRef();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    const mediaQuery = window.matchMedia('(max-width: 1024px)')
    setIsMobile(mediaQuery.matches)

    const handleMediaChange = (e) => setIsMobile(e.matches)

    return () => window.removeEventListener('resize', handleMediaChange)
  }, [user])

  const showMobileNavbar = () => {
    hamburger.current.classList.toggle('is-active')
    navbar.current.classList.toggle('is-active')
  }

  const closeMobileNavbar = () => {
    if (navbar.current.classList.contains('is-active')) {
      hamburger.current.classList.remove('is-active')
      navbar.current.classList.remove('is-active')
    }
  }

  const toggleDropdown = () => {
    if (isMobile) {
      setIsDropdownOpen(!isDropdownOpen)
    }
  }

  const closeDropdown = () => {
    setIsDropdownOpen(false)
  }

  const handleNavItemClick = () => {
    closeDropdown()
    closeMobileNavbar()
  }

  const handleDropdownMouseEnter = () => {
    if (!isMobile) {
      setIsDropdownOpen(true)
    }
  }

  const handleDropdownMouseLeave = () => {
    if (!isMobile) {
      setIsDropdownOpen(false)
    }
  }

  const getLoggedInButtons = () => {
    return (
      <div 
        className={`navbar-item has-dropdown ${isDropdownOpen ? 'is-active' : ''}`}
        onMouseEnter={handleDropdownMouseEnter}
        onMouseLeave={handleDropdownMouseLeave}
      >
        <a className="navbar-link" onClick={toggleDropdown}>
          <span className="icon">
            <i className="fas fa-user-circle is-medium"></i>
          </span>
        </a>
        <div className="navbar-dropdown is-right">
          <Link href="/cart" className="navbar-item" onClick={handleNavItemClick}>Cart</Link>
          <Link href="/my-orders" className="navbar-item" onClick={handleNavItemClick}>My Orders</Link>
          <Link href="/payments/" className="navbar-item" onClick={handleNavItemClick}>Payment Methods</Link>
          <Link href="/profile" className="navbar-item" onClick={handleNavItemClick}>Profile</Link>
          {
            user.store ?
              <>
                <Link href={`/stores/${user.store.id}`} className="navbar-item" onClick={handleNavItemClick}>View Your Store</Link>
                <Link href="/products/new" className="navbar-item" onClick={handleNavItemClick}>Add a new Product</Link>
              </>
              :
              <Link href="/stores/new" className="navbar-item" onClick={handleNavItemClick}>Interested in selling?</Link>
          }
          <hr className="navbar-divider"></hr>
          <Link legacyBehavior href="/login">
            <a className="navbar-item" onClick={
              () => {
                setUserToken(null)
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
          <Link href="/" className="navbar-item" onClick={handleNavItemClick}>Products</Link>
          <Link href="/stores" className="navbar-item" onClick={handleNavItemClick}>Stores</Link>
        </div>
        <div className="navbar-end">
          {isLoggedIn ? getLoggedInButtons() : getLoggedOutButtons()}
        </div>
      </div>
    </nav>
  );
}