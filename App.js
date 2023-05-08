import React from 'react';
import {Provider} from 'react-redux';
import Routes from './src/navigation/Routes';
import {configureStore} from '@reduxjs/toolkit';
import authReducer from './src/redux/reducer/authReducer';
import cartItemsReducer from './src/redux/reducer/CartReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartItemsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export default function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}
