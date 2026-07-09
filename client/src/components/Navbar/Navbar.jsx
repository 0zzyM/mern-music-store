import { Link } from "react-router-dom";
import { FaHeart, FaUser } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import "./Navbar.css";
import NavbarSearch from "./NavbarSearch";
import { useContext, useState } from "react";
import { SearchContext } from "../../contexts/SearchContext";
import { useDispatch, useSelector } from "react-redux";
import { closeCart, openCart } from "../../features/cartSlice";
import { RxHamburgerMenu } from "react-icons/rx";
import MobileDrawer from "./MobileDrawer";
import DesktopBottomNavbar from "./DesktopBottomNavbar.jsx";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { isSearching } = useContext(SearchContext);

  const isCartView = useSelector((state) => state.cart.isCartOpen);

  const dispatch = useDispatch();

  const toggleCartView = (isCartView) => {
    if (isCartView) {
      dispatch(closeCart());
    } else dispatch(openCart());
  };

  return (
    <header className="page-header">
      <nav className="page-header-top" aria-label="Main">
        <button
          className="hamburger-btn"
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open menu"
        >
          <RxHamburgerMenu className="hamburger-icon" />
        </button>
        <Link className="logo-wrapper" to="/">
          <div className="logo">ozzyMusic</div>
        </Link>

        <NavbarSearch />

        <div className="header-actions">
          <button
            className="navbar-cart-btn"
            onClick={() => {
              toggleCartView(isCartView);
            }}
            aria-label="Open cart"
          >
            <LuShoppingCart className="cart-icon" />
          </button>

          <Link to="/wishlist" aria-label="Wishlist">
            <FaHeart className="wish-list-icon" />
          </Link>

          <Link to="/profile" aria-label="Profile">
            <FaUser className="user-icon" />
          </Link>
        </div>
      </nav>

      <DesktopBottomNavbar isSearching={isSearching} />

      <MobileDrawer
        isMenuOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </header>
  );
}

export default Navbar;
