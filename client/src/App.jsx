import "./App.css";
import Navbar from "./components/Navbar/Navbar.jsx";
import HomePage from "./pages/HomePage.jsx";
import CategoriesPage from "./pages/CategoriesPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import PageFooter from "./components/Footer/PageFooter.jsx";

import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/categories" element={<CategoriesPage />}></Route>
        <Route path="/categories/:category" element={<CategoryPage />} />
        <Route path="/products" element={<ProductsPage />}></Route>
      </Routes>
      <PageFooter />
    </>
  );
}

export default App;
