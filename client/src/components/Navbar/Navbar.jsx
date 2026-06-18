import { Link } from "react-router-dom";
import { FaHeart, FaUser } from "react-icons/fa";
import { LuShoppingCart, LuSearch } from "react-icons/lu";
import "./Navbar.css";
import NavbarSearch from "./NavbarSearch";
import { useContext } from "react";
import { SearchContext } from "../../contexts/SearchContext";

function Navbar() {
  const { isSearching } = useContext(SearchContext);

  return (
    <header className="page-header">
      <nav className="page-header-top">
        <Link className="logo-wrapper" to="/">
          <div className="logo">ozzyMusic</div>
        </Link>

        <NavbarSearch />

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

      <nav
        className="page-header-bottom"
        style={isSearching ? { opacity: "0" } : { opacity: "1" }}
      >
        {/*TODO: Consider re-styling Navbar dropdown */}
        <ul className="categories-nav">
          <li className="nav-item">
            <Link to="/categories/guitars">Guitars</Link>

            <div className="header-dropdown">
              <Link
                to="/products?subcategory=electric-guitars"
                className="header-dropdown-item"
              >
                Electric Guitars
              </Link>
              <Link
                to="/products?subcategory=bass-guitars"
                className="header-dropdown-item"
              >
                Bass Guitars
              </Link>
              <Link
                to="/products?subcategory=acoustic-guitars"
                className="header-dropdown-item"
              >
                Acoustic Guitars
              </Link>
            </div>
          </li>
          <li className="nav-item">
            <Link to="/categories/amplification">Amplification</Link>

            <div className="header-dropdown">
              <Link
                to="/products?subcategory=combo-amps"
                className="header-dropdown-item"
              >
                Combo Amps
              </Link>
              <Link
                to="/products?subcategory=amp-heads"
                className="header-dropdown-item"
              >
                Amp Heads
              </Link>
              <Link
                to="/products?subcategory=amp-cabinets"
                className="header-dropdown-item"
              >
                Amp Cabinets
              </Link>
              <Link
                to="/products?subcategory=bass-amps"
                className="header-dropdown-item"
              >
                Bass Amps
              </Link>
            </div>
          </li>
          <li className="nav-item">
            <Link to="/categories/effects">Effects</Link>

            <div className="header-dropdown">
              <Link
                to="/products?subcategory=overdrive-distortion"
                className="Overdrive & Distortion"
              >
                Overdrive & Distortion
              </Link>
              <Link
                to="/products?subcategory=reverb"
                className="header-dropdown-item"
              >
                Reverb
              </Link>
              <Link
                to="/products?subcategory=delay"
                className="header-dropdown-item"
              >
                Delay
              </Link>
              <Link
                to="/products?subcategory=modulation"
                className="header-dropdown-item"
              >
                Modulation
              </Link>
              <Link
                to="/products?subcategory=multi-effects"
                className="header-dropdown-item"
              >
                Multi-effects
              </Link>
            </div>
          </li>
          <li className="nav-item">
            <Link to="/categories/recording">Recording</Link>
            <div className="header-dropdown">
              <Link
                to="/products?subcategory=audio-interfaces"
                className="header-dropdown-item"
              >
                Overdrive & Distortion
              </Link>
              <Link
                to="/products?subcategory=studio-headphones"
                className="header-dropdown-item"
              >
                Studio Headphones
              </Link>
              <Link
                to="/products?subcategory=microphones"
                className="header-dropdown-item"
              >
                Microphones
              </Link>
            </div>
          </li>
          <li className="nav-item">
            <Link to="/categories/maintenance">Maintenance</Link>
            <div className="header-dropdown">
              <Link
                to="/products?subcategory=guitar-care"
                className="header-dropdown-item"
              >
                Guitar Care
              </Link>
              <Link
                to="/products?subcategory=Guitar Tools"
                className="header-dropdown-item"
              >
                Guitar Tools
              </Link>
            </div>
          </li>
          <li className="nav-item">
            <Link to="/categories/accessories">Accessories</Link>
            <div className="header-dropdown">
              <Link
                to="/products?subcategory=guitar-strings"
                className="header-dropdown-item"
              >
                Guitar Strings
              </Link>
              <Link
                to="/products?subcategory=bass-strings"
                className="header-dropdown-item"
              >
                Bass Strings
              </Link>
              <Link
                to="/products?subcategory=picks"
                className="header-dropdown-item"
              >
                Picks
              </Link>
              <Link
                to="/products?subcategory=straps"
                className="header-dropdown-item"
              >
                Straps
              </Link>
              <Link
                to="/products?subcategory=tuners"
                className="header-dropdown-item"
              >
                Tuners
              </Link>
            </div>
          </li>
          {/*TODO: Decide to keep and build or remove */}
          {/*
          <li className="nav-item">
            <Link to="/categories/services">Services</Link>
          </li>
          */}
          <li className="nav-item">
            <Link to="/contact-us">Contact Us</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
