// Define the keys for accessing values in the browser's local storage.
const LocalStorageKeys = {
    AuthToken: "user-token",
    RememberUser: "user-remember",
    UserProfile: "user-profile",
  };
  
  // Define static routes used in the application.
  const StaticRoutes = {
    Profile: "/profile",
    Landing: "/",
    Login: "/login",
  };
  
  // Export the LocalStorageKeys and StaticRoutes objects as module exports.
  export { LocalStorageKeys, StaticRoutes };