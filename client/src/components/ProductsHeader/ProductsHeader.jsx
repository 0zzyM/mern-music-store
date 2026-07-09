import { RxCaretSort } from "react-icons/rx";
import "./ProductsHeader.css";
import { BsGrid } from "react-icons/bs";
import { useState } from "react";
import { IoIosList } from "react-icons/io";
import { useSearchParams } from "react-router-dom";
import { BsFilterRight } from "react-icons/bs";

export default function ProductsHeader({ title }) {
  const [listView, setListView] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const sortOption = searchParams.get("sort");

  const handleSort = (e) => {
    searchParams.set("sort", e.target.value);
    setSearchParams(searchParams);
  };

  const toggleView = () => {
    listView ? setListView(false) : setListView(true);
  };

  return (
    <>
      <div className="products-page-header">
        <div className="header-top">
          <h1 className="products-page-title">{title}</h1>
        </div>

        <div className="header-bottom">
          <div className="filter-text">
            <BsFilterRight className="filter-icon" />
            <p>Filters</p>
          </div>
          <div className="sorting-actions">
            <div className="sort-wrapper">
              <select
                value={sortOption ?? ""}
                onChange={handleSort}
                aria-label="Sort products"
              >
                {/* TODO: Default can be set to Popular after logic is implemented */}
                <option value="">Sort by...</option>
                <option value="mostSold">Most Sold</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
                <option value="newest">Newest</option>
                <option value="rating">Highest Rated</option>
              </select>
              <RxCaretSort className="sorting-operator" />
              {/* TODO: Change this so it also trigers click */}
            </div>
            <div className="toggle-view">
              {listView ? (
                <BsGrid className="grid-view-icon" onClick={toggleView} />
              ) : (
                <IoIosList className="list-view-icon" onClick={toggleView} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
