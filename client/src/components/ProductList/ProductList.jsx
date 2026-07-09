import { useEffect } from "react";
import { useState } from "react";
import ProductListCard from "./ProductListCard";
import "./ProductList.css";
import { SERVER_URL, PRODUCTS_PER_PAGE } from "../../config.js";
import { useFilters } from "../../hooks/useFilters.js";

export default function ProductList({ filters, subcategory }) {
  const [products, setProducts] = useState(null);
  const [total, setTotal] = useState(null);

  const {
    goToPage,
    goToNextPage,
    goToPrevPage,
    goToFirstPage,
    goToLastPage,
    page,
  } = useFilters();

  const currentPage = Number(page) || 1;

  useEffect(() => {
    const getProducts = async () => {
      let url = `${SERVER_URL}/api/v1/products`;
      if (filters) url += filters;

      try {
        const res = await fetch(url);
        const data = await res.json();
        setProducts(data.products);
        setTotal(data.total);
      } catch (error) {
        console.error(`Error fetching ${url}`, error);
      }
    };
    getProducts();
  }, [filters]);

  if (!products) return <p>Loading...</p>;

  if (total === 0) return <p style={{ width: "960px" }}>No product Found...</p>;

  const NO_OF_PAGES = Math.ceil(total / PRODUCTS_PER_PAGE);

  return (
    <div className="product-list-wrapper">
      <div className="product-list">
        {products.map((product) => {
          return (
            <ProductListCard
              key={product._id}
              product={product}
              subcategory={subcategory}
            />
          );
        })}
      </div>

      <div className="pagination-btn-wrapper">
        <button
          className="pagination-btn"
          onClick={() => {
            currentPage != 1 && goToFirstPage();
          }}
          aria-label="First page"
        >
          &lt; &lt;
        </button>
        <button
          className="pagination-btn"
          onClick={() => {
            currentPage != 1 && goToPrevPage();
          }}
          aria-label="Previous page"
        >
          &lt;
        </button>

        {currentPage > 1 && (
          <button
            className="pagination-btn"
            onClick={() => {
              goToPage(currentPage - 1);
            }}
            aria-current="page"
          >
            {currentPage - 1}
          </button>
        )}

        <button className="pagination-btn active">{currentPage}</button>

        {currentPage < NO_OF_PAGES && (
          <button
            className="pagination-btn"
            onClick={() => {
              goToPage(currentPage + 1);
            }}
            aria-label="Next page"
          >
            {currentPage + 1}
          </button>
        )}

        <button
          className="pagination-btn"
          onClick={() => {
            currentPage != NO_OF_PAGES && goToNextPage(NO_OF_PAGES);
          }}
          aria-label="Last page"
        >
          &gt;
        </button>
        <button
          className="pagination-btn"
          onClick={() => {
            currentPage != NO_OF_PAGES && goToLastPage(NO_OF_PAGES);
          }}
        >
          &gt; &gt;
        </button>
      </div>
    </div>
  );
}
