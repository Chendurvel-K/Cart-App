import {createSlice} from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
  },
  reducers: {
    signIn: (state, action) => {
      state.user = action.payload;
    },
    signUp: (state, action) => {
      state.user = action.payload;
    },
    signOut: state => {
      state.user = null;
    },
    default: state => {
      state;
    },
  },
});

export const {signIn, signUp, signOut} = authSlice.actions;
export const selectUser = state => state.auth.user;

export default authSlice.reducer;
