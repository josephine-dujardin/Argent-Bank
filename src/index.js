import React from "react";
import ReactDOM from "react-dom/client";
import AuthProvider from "./store/authStore";
import "./index.css";
import { LocalStorageKeys } from "./const/const";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/layout";
import Home from "./pages/home";
import Login from "./pages/login";
import Profile from "./pages/profile";
import NotFound from "./pages/notFound";
import { StaticRoutes } from "./const/const";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={StaticRoutes.Login} element={<Login />} />
          <Route path={StaticRoutes.Profile} element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AuthProvider>
    </BrowserRouter>
);

window.onbeforeunload = () => {
  const rememberUser = localStorage.getItem(LocalStorageKeys.RememberUser);
  if (!rememberUser) localStorage.removeItem(LocalStorageKeys.AuthToken);
};
