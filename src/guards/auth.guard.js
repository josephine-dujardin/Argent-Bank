import { LocalStorageKeys, StaticRoutes } from "../const/const";
import { authStore } from "../store/authStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthGuard = () => {
  const fromLocalStorage = !!localStorage.getItem(LocalStorageKeys.AuthToken);
  const isConnected = !!authStore.getState().auth.token || fromLocalStorage;
  const navigate = useNavigate();
  useEffect(() => {
    if (!isConnected) {
      navigate(StaticRoutes.Login);
    }
  });
};

export default AuthGuard;