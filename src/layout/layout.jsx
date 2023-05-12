import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer";

const Layout = () => (
    <>
        <NavBar />
        <Outlet />
        <Footer />
    </>
);

export default Layout;
