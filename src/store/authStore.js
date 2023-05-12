import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { argentBankApi } from "../services/auth.service";
import ReactNode from "react";
import { Provider } from "react-redux";
import authReducer from "./authReducer";

export const authStore = configureStore({
  reducer: {
    [argentBankApi.reducerPath]: argentBankApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(argentBankApi.middleware),
});

setupListeners(authStore.dispatch);

const AuthProvider = function (_a) {
    var children = _a.children;
    return ReactNode.createElement(
      Provider,
      { store: authStore },
      children
    );
  };
  

export default AuthProvider;