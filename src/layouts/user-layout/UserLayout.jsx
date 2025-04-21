import { Outlet } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import NavbarMenu from "../../components/navbar-menu/NavbarMenu";
import ScrollToTop from "../../components/scroll-to-top/ScrollToTop";
import CartProvider from "../../providers/cartProvider";

export default function UserLayout() {
    return (
        <CartProvider>
            <ScrollToTop />
            <NavbarMenu />

            <Outlet />
            
            <Footer />
        </CartProvider>
    );
}