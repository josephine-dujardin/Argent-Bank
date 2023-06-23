import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer";

/**
 * The Layout component represents the overall layout of the application.
 * It includes a navigation bar, the main content (rendered by the `Outlet` component),
 * and a footer.
 */

const Layout = () => (
    <>
        <NavBar />
        <Outlet />
        <Footer />
    </>
);

export default Layout;
