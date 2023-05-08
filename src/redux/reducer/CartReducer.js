import {createSlice} from '@reduxjs/toolkit';

export const cartItemsReducer = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    ADD_TO_CART: (state, action) => {
      console.log('====================================');
      console.log('guuuu');
      console.log('====================================');
      state.items = action.payload;
    },
    REMOVE_FROM_CART: (state, action) => {
      state.items = action.payload;
    },
    REMOVE_All_FROM_CART: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const {ADD_TO_CART, REMOVE_FROM_CART, REMOVE_All_FROM_CART} = cartItemsReducer.actions;
// export const selectUser = state => state.auth.user;

export default cartItemsReducer.reducer;
