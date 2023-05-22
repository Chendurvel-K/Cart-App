import React from "react";
import { Provider } from "react-redux";
import Routes from "./src/navigation/Routes";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./src/redux/reducer/authReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export default function App() {
  console.log("App.js");
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}
