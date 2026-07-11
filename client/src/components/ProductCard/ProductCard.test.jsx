import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import cartReducer from "../../features/cartSlice";
import ProductCard from "./ProductCard";
import userEvent from "@testing-library/user-event";

//TODO: Add compare and wishlist btn tests when they are done

describe("ProductCard", () => {
  const guitar = {
    _id: "g1",
    name: "Stratocaster",
    price: 899,
    stock: 5,
    rating: 4.5,
    images: ["stratocaster.jpg"],
  };

  it("renders the product name, image, rating and price", () => {
    const store = configureStore({ reducer: { cart: cartReducer } });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductCard product={guitar} />
        </MemoryRouter>
      </Provider>,
    );

    const name = screen.getByText("Stratocaster");
    expect(name).toBeInTheDocument();

    const img = screen.getByRole("img", { name: "Stratocaster" });
    expect(img).toHaveAttribute("src", "stratocaster.jpg");

    const price = screen.getByText("€899");
    expect(price).toBeInTheDocument();

    const rating = screen.getByText("4.5");
    expect(rating).toBeInTheDocument();
  });

  it("renders the product action buttons and their icons", () => {
    const store = configureStore({ reducer: { cart: cartReducer } });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductCard product={guitar} />
        </MemoryRouter>
      </Provider>,
    );

    // can do this because of aria-label even though no visible text exist and it is icon only btn
    const wishlistBtn = screen.getByRole("button", {
      name: "Add to Wishlist",
    });
    expect(wishlistBtn).toBeInTheDocument();

    const compareBtn = screen.getByRole("button", {
      name: "Compare product",
    });
    expect(compareBtn).toBeInTheDocument();

    const cartBtn = screen.getByRole("button", {
      name: "Add to Cart",
    });
    expect(cartBtn).toBeInTheDocument();
  });

  it("adds the item to the cart and opens the cart", async () => {
    const store = configureStore({ reducer: { cart: cartReducer } });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductCard product={guitar} />
        </MemoryRouter>
      </Provider>,
    );

    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: /add to cart/i }));

    const items = store.getState().cart.items;
    const isCartOpen = store.getState().cart.isCartOpen;

    expect(items).toHaveLength(1);
    expect(items[0]._id).toBe("g1");
    expect(items[0].quantity).toBe(1);
    expect(isCartOpen).toBe(true);
  });
});
