import "./App.css";
import Navbar from "./components/Navbar/Navbar.jsx";
import HomePage from "./pages/HomePage.jsx";
import CategoriesPage from "./pages/CategoriesPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import CartPage from "./pages/CartPage.jsx";

import PageFooter from "./components/Footer/PageFooter.jsx";
import { SearchProvider } from "./contexts/SearchProvider.jsx";

import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <SearchProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/categories" element={<CategoriesPage />}></Route>
        <Route path="/categories/:category" element={<CategoryPage />} />
        <Route path="/products" element={<ProductsPage />}></Route>
        <Route path="/products/:id" element={<ProductPage />}></Route>
        <Route path="/cart" element={<CartPage />}></Route>
      </Routes>
      <PageFooter />
    </SearchProvider>
  );
}

export default App;
