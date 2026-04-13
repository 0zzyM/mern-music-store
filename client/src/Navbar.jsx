import cartIcon from "./assets/cart.svg";
import userIcon from "./assets/user.svg";
import searchIcon from "./assets/search.svg";

const navMenuItem = "text-white hover:text-red-500 transition-colors";

function Navbar() {
  return (
    <>
      {/* Page Header */}
      <header className="p-2.5 bg-[#001822] flex items-center justify-between w-full gap-10">
        {/* Navigation Links */}
        <nav className="w-60 flex justify-between items-center gap-10">
          <a className={navMenuItem} href="#">
            Shop
          </a>
          <a className={navMenuItem} href="#">
            Services
          </a>
          <a className={navMenuItem} href="#">
            Contact
          </a>
        </nav>

        {/* Logo */}
        <div className="text-white text-2xl font-bold">ozzyMusic</div>

        {/* Header Actions */}
        <div className="w-60 flex justify-center items-center gap-5">
          <a href="#">
            <img className="w-9" src={searchIcon} alt="Search" />
          </a>
          <a href="#">
            <img className="w-9" src={cartIcon} alt="Cart" />
          </a>
          <a href="#">
            <img className="w-9" src={userIcon} alt="User" />
          </a>
        </div>
      </header>
    </>
  );
}

export default Navbar;
