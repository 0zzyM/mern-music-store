import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import cartReducer from "../features/cartSlice";

export function renderWithProviders(ui, { preloadedState = {} } = {}) {
  const store = configureStore({
    reducer: { cart: cartReducer },
    preloadedState,
  });

  const result = render(
    <Provider store={store}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>,
  );

  return { store, ...result };
}
