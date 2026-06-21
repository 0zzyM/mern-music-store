import "./App.css";
import Navbar from "./components/Navbar/Navbar.jsx";
import HomePage from "./pages/HomePage.jsx";
import CategoriesPage from "./pages/CategoriesPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import PageFooter from "./components/Footer/PageFooter.jsx";
import { Route, Routes } from "react-router-dom";
import CartSidebar from "./components/Cart/CartSidebar.jsx";
import { useSelector, useDispatch } from "react-redux";
import { closeCart } from "./features/cartSlice";
import { useContext } from "react";
import { SearchContext } from "./contexts/SearchContext.js";

function App() {
  const isCartView = useSelector((state) => state.cart.isCartOpen);

  const dispatch = useDispatch();

  const { isSearching, setIsSearching, setSuggestions } =
    useContext(SearchContext);

  return (
    <>
      <Navbar />
      <div className={isSearching ? "page-content searching" : "page-content"}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/categories" element={<CategoriesPage />}></Route>
          <Route path="/categories/:category" element={<CategoryPage />} />
          <Route path="/products" element={<ProductsPage />}></Route>
          <Route path="/products/:id" element={<ProductPage />}></Route>
          <Route path="/cart" element={<CartPage />}></Route>
        </Routes>
        <div
          className={
            isCartView
              ? "page-backdrop-active"
              : isSearching
                ? "page-backdrop-searching"
                : "page-backdrop"
          }
          onClick={() => {
            dispatch(closeCart());
            setIsSearching(false);
            setSuggestions(null);
          }}
        ></div>
      </div>
      <CartSidebar />

      <PageFooter />
    </>
  );
}

export default App;
