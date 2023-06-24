import React from "react";
import ReactDOM from "react-dom/client";
import AuthProvider from "./store/authStore";
import App from "./App";
import "./index.css";
import { LocalStorageKeys } from "./const/const";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

window.onbeforeunload = () => {
  const rememberUser = localStorage.getItem(LocalStorageKeys.RememberUser);
  if (!rememberUser) localStorage.removeItem(LocalStorageKeys.AuthToken);
};
