import cartIcon from "./assets/cart.svg";
import userIcon from "./assets/user.svg";
import searchIcon from "./assets/search.svg";

import "./Navbar.css";
function Navbar() {
  return (
    <>
      <header className="page-header">
        <nav className="nav-wrapper">
          <a className="nav-menu-item" href="#">
            Shop
          </a>
          <a className="nav-menu-item" href="#">
            Services
          </a>
          <a className="nav-menu-item" href="#">
            Contact
          </a>
        </nav>

        <div className="logo">ozzyMusic</div>

        <div className="header-actions">
          <div className="header-action">
            <a className="header-action-item" href="#">
              <img className="search-icon" src={searchIcon} alt="" />
            </a>
          </div>
          <div className="login-register">
            <a className="login-register-btn" href="#">
              <img className="cart-icon" src={cartIcon} alt="" />
            </a>
          </div>
          <div className="cart">
            <a className="cart-btn" href="#">
              <img className="user-icon" src={userIcon} alt="" />
            </a>
          </div>
        </div>
      </header>

      {/* 
      <div>
        <div className="search-bar-wrapper">
          <input className="search-bar" placeholder="Search" type="text" />
        </div>
      </div>
    */}
    </>
  );
}

export default Navbar;
