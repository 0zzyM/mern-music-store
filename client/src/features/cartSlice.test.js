import { describe, it, expect } from "vitest";
import reducer, {
  addItem,
  removeItem,
  updateQty,
  clearCart,
  openCart,
  closeCart,
} from "./cartSlice";

describe("cartSlice", () => {
  const guitar = { _id: "g1", name: "Stratocaster", price: 899, stock: 5 };

  it("adds a new item to an empty cart", () => {
    const initialState = { items: [], isCartOpen: false };

    const state = reducer(initialState, addItem({ product: guitar, qty: 2 }));

    expect(state.items).toHaveLength(1);
    expect(state.items[0]._id).toBe("g1");
    expect(state.items[0].quantity).toBe(2);
  });

  it("adds quantity of item not more than what is on stock", () => {
    const initialState = { items: [], isCartOpen: false };

    const state1 = reducer(
      initialState,
      addItem({ product: guitar, qty: 100 }),
    );

    expect(state1.items).toHaveLength(1);
    expect(state1.items[0].quantity).toBe(guitar.stock);
  });

  it("does not increment quantity of item more than what is on stock", () => {
    const initialState = { items: [], isCartOpen: false };

    const state1 = reducer(initialState, addItem({ product: guitar, qty: 4 }));

    expect(state1.items).toHaveLength(1);

    const state2 = reducer(state1, addItem({ product: guitar, qty: 100 }));
    expect(state2.items[0].quantity).toBe(guitar.stock);
  });

  it("increments quantity when the same item is added again", () => {
    const initialState = { items: [], isCartOpen: false };

    const state1 = reducer(initialState, addItem({ product: guitar, qty: 2 }));
    const state2 = reducer(state1, addItem({ product: guitar, qty: 2 }));

    expect(state2.items).toHaveLength(1);
    expect(state2.items[0].quantity).toBe(4);
  });

  it("does not add item if qty input is negative or 0", () => {
    const initialState = { items: [], isCartOpen: false };
    const state1 = reducer(initialState, addItem({ product: guitar, qty: -1 }));
    expect(state1.items).toHaveLength(0);
    const state2 = reducer(state1, addItem({ product: guitar, qty: 0 }));
    expect(state2.items).toHaveLength(0);
  });

  it("does not increment items quantity if qty input is negative or 0", () => {
    const initialState = { items: [], isCartOpen: false };
    const state1 = reducer(initialState, addItem({ product: guitar, qty: 2 }));
    expect(state1.items).toHaveLength(1);
    expect(state1.items[0].quantity).toBe(2);
    const state2 = reducer(state1, addItem({ product: guitar, qty: -1 }));
    expect(state2.items).toHaveLength(1);
    expect(state2.items[0].quantity).toBe(2);
    const state3 = reducer(state2, addItem({ product: guitar, qty: 0 }));
    expect(state3.items).toHaveLength(1);
    expect(state3.items[0].quantity).toBe(2);
  });

  it("removes an item from cart", () => {
    const initialState = {
      items: [{ ...guitar, quantity: 1 }],
      isCartOpen: false,
    };

    const state = reducer(initialState, removeItem("g1"));

    expect(state.items).toHaveLength(0);
  });

  it("updates quantity of an item in the cart", () => {
    const initialState = { items: [], isCartOpen: false };

    const state1 = reducer(initialState, addItem({ product: guitar, qty: 2 }));

    const state2 = reducer(state1, updateQty({ id: guitar._id, qty: 1 }));

    expect(state2.items).toHaveLength(1);
    expect(state2.items[0].quantity).toBe(1);
  });

  it("updates quantity of an item to it's stock if user tries to update with over-stock number", () => {
    const initialState = { items: [], isCartOpen: false };

    const state1 = reducer(initialState, addItem({ product: guitar, qty: 2 }));

    const state2 = reducer(state1, updateQty({ id: guitar._id, qty: 100 }));

    expect(state2.items).toHaveLength(1);
    expect(state2.items[0].quantity).toBe(guitar.stock);
  });

  it("does not update quantity of an item if qty input is negative", () => {
    const initialState = { items: [], isCartOpen: false };

    const state1 = reducer(initialState, addItem({ product: guitar, qty: 2 }));

    const state2 = reducer(state1, updateQty({ id: guitar._id, qty: -5 }));

    expect(state2.items).toHaveLength(1);
    expect(state2.items[0].quantity).toBe(2);
  });

  it("removes the item if qty input is set to 0", () => {
    const initialState = { items: [], isCartOpen: false };

    const state1 = reducer(initialState, addItem({ product: guitar, qty: 2 }));

    expect(state1.items).toHaveLength(1);
    expect(state1.items[0].quantity).toBe(2);

    const state2 = reducer(state1, updateQty({ id: guitar._id, qty: 0 }));
    expect(state2.items).toHaveLength(0);
  });

  it("does nothing when updating quantity of an item not in the cart", () => {
    const initialState = { items: [], isCartOpen: false };

    const state1 = reducer(initialState, addItem({ product: guitar, qty: 2 }));

    const state2 = reducer(state1, updateQty({ id: "wrongID", qty: 3 }));

    expect(state2.items).toHaveLength(1);
    expect(state2.items[0].quantity).toBe(2);
  });

  it("clears the cart", () => {
    const initialState = { items: [], isCartOpen: false };

    const state1 = reducer(initialState, addItem({ product: guitar, qty: 2 }));

    const state2 = reducer(state1, clearCart());

    expect(state2.items).toHaveLength(0);
  });

  it("opens the cart", () => {
    const initialState = { items: [], isCartOpen: false };

    expect(initialState.isCartOpen).toBe(false);

    const state = reducer(initialState, openCart());

    expect(state.isCartOpen).toBe(true);
  });

  it("closes the cart", () => {
    const initialState = { items: [], isCartOpen: true };

    expect(initialState.isCartOpen).toBe(true);

    const state = reducer(initialState, closeCart());

    expect(state.isCartOpen).toBe(false);
  });
});
