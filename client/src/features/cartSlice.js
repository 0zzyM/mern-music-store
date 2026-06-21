import { createSlice } from "@reduxjs/toolkit"; // think this  one like my factory

// The Logic of Redux
{
  /*
    Component                Store
   |                       |
   |-- dispatch(addItem) -->|
   |                       |--> reducer runs --> state updates
   |<-- component re-renders (via useSelector) --|
*/
}

export const cartSlice = createSlice({
  name: "cart", // give it  a label for redux
  initialState: {
    items: [],
    isCartOpen: false,
  }, //2nd object redux needs
  reducers: {
    addItem(state, action) {
      //payload is the datada we attach when firing an action from a component
      //dispatch(addItem({ product: product, qty: 2 }))
      //                  ^^^^^^^^^^^^^^^^^^^^^^^^^^

      //!qty 1 is the  fall back - if dispatch did not include qty it will be undefined
      const { product, qty = 1 } = action.payload;

      const existing = state.items.find((i) => i._id === product._id);
      if (existing) {
        //! CRITICAL here if not enough stock then can't add to cart
        //! Check if existing quantity + added or stock is smaller then  return min
        existing.quantity = Math.min(existing.quantity + qty, product.stock);
      } else {
        //! Same  here so user can't order 1000 qty of orders for a product that has 5 in stock
        state.items.push({
          ...product,
          quantity: Math.min(qty, product.stock),
        });
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter((i) => i._id !== action.payload);
    },
    updateQty(state, action) {
      //! no need the whole  product  object down here pass product._id with dispatch
      const { id, qty = 1 } = action.payload;
      const item = state.items.find((i) => i._id === id);

      //In Redux it's good habit to guard find results because find returns undefined on no match,
      //  and undefined.quantity = qty would throw a runtime error and crash the app.
      // One if prevents the problem.
      if (item) item.quantity = qty;

      // No mutation but this introduced a bug where the items reorder
      {
        /*const { product, qty = 1 } = action.payload;
      let item = state.items.find((i) => i._id === product._id);
      state.items = state.items.filter((i) => i._id === action.payload);
      item = { ...item, qty: { qty } };
      state.items.push(item); */
      }
    },
    clearCart(state) {
      state.items = [];
    },
    openCart(state) {
      state.isCartOpen = true;
    },
    closeCart(state) {
      state.isCartOpen = false;
    },
  }, //object where we pass the functions as keys to change state
});

// Action creators are generated for each case reducer function
// Exported for components to dispatch
export const {
  addItem,
  removeItem,
  updateQty,
  clearCart,
  openCart,
  closeCart,
} = cartSlice.actions;

// Exported for the store to process the dispatches
export default cartSlice.reducer;
