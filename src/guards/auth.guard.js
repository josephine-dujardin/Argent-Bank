import { LocalStorageKeys, StaticRoutes } from "../const/const";
import { authStore } from "../store/authStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthGuard = () => {
  // Check if there is an authentication token stored in the local storage.
  const fromLocalStorage = !!localStorage.getItem(LocalStorageKeys.AuthToken);

  // Check if the user is connected by checking the authentication state in the store
  // or the presence of an authentication token from the local storage.
  const isConnected = !!authStore.getState().auth.token || fromLocalStorage;

  const navigate = useNavigate();

  useEffect(() => {
    // If the user is not authenticated, navigate to the login page.
    if (!isConnected) {
      navigate(StaticRoutes.Login);
    }
  });

};

export default AuthGuard;