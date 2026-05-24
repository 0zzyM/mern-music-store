import { Link } from "react-router-dom";
import { FaHeart, FaUser } from "react-icons/fa";
import { LuShoppingCart, LuSearch } from "react-icons/lu";

import "./Navbar.css";
import React from "react";

function Navbar() {
  return (
    <header className="page-header">
      <nav className="page-header-top">
        <Link className="logo-wrapper" to="/">
          <div className="logo">ozzyMusic</div>
        </Link>

        <div className="page-search-bar-wrapper">
          <input
            type="text"
            className="page-search-bar"
            placeholder="Search for a product"
          />
          {/*TODO: Add search function here */}
          <label className="header-search-icon">
            <LuSearch />
          </label>
        </div>
        <div className="header-actions">
          {/*TODO: Username needs to be added to the routing */}
          <Link to="/username/wishlist">
            <FaHeart className="wish-list-icon" />
          </Link>
          <Link to="/username/cart">
            <LuShoppingCart className="cart-icon" />
          </Link>
          <Link to="/username/profile">
            <FaUser className="user-icon" />
          </Link>
        </div>
      </nav>

      {/* TODO:EDIT Bottom Navbar */}

      <nav className="page-header-bottom">
        <ul className="categories-nav">
          <li className="nav-item">
            <Link to="/categories/guitars">Guitars</Link>
            {/*TODO: Add Styling and State for dropdown 
              <div className="dropdown">
                <Link to="/products?subcategory=electric-guitars">
                  Electric Guitars
                </Link>
                <Link to="/products?subcategory=bass-guitars">
                  Bass Guitars
                </Link>
                <Link to="/products?subcategory=acoustic-guitars">
                  Acoustic Guitars
                </Link>
              </div>
              */}
          </li>
          <li className="nav-item">
            <Link to="/categories/amplification">Amplification</Link>
          </li>
          <li className="nav-item">
            <Link to="/categories/effects">Effects</Link>
          </li>
          <li className="nav-item">
            <Link to="/categories/recording">Recording</Link>
          </li>
          <li className="nav-item">
            <Link to="/categories/maintenance">Maintenance</Link>
          </li>
          <li className="nav-item">
            <Link to="/categories/accessories">Accessories</Link>
          </li>
          <li className="nav-item">
            <Link to="/categories/services">Services</Link>
          </li>
          <li className="nav-item">
            <Link to="/categories/contact-us">Contact Us</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
