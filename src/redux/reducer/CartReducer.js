import {createSlice} from '@reduxjs/toolkit';

export const cartItemsReducer = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    ADD_TO_CART: (state, action) => {
      console.log("Add:"+action.payload.length);
      state.items = action.payload;
    },
    REMOVE_FROM_CART: (state, action) => {
            console.log("Remove:"+action.payload);

      state.items = action.payload;
    },
    REMOVE_All_FROM_CART: (state, action) => {
            console.log("Remove all:"+action.payload);

      state.items = action.payload;
    },
  },
});

export const {ADD_TO_CART, REMOVE_FROM_CART, REMOVE_All_FROM_CART} = cartItemsReducer.actions;
export const selectCart = state => state.cart.items;

export default cartItemsReducer.reducer;
