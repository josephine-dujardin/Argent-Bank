import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/layout";
import Home from "./pages/home";
import Login from "./pages/login";
import Profile from "./pages/profile";
import NotFound from "./pages/notFound";

import { StaticRoutes } from "./const/const";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={StaticRoutes.Login} element={<Login />} />
          <Route path={StaticRoutes.Profile} element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;