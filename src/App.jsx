import { Route, Routes } from 'react-router-dom';
import NavbarMenu from './components/navbar-menu/NavbarMenu';
import "./App.css";
import Footer from './components/footer/Footer';

import Home from './components/home/Home';
import ArtShop from './components/art-shop/ArtShop';
import Portfolio from './components/portfolio/Portfolio';
import About from './components/about/About';
import PaintingDetails from './components/painting-details/PaintingDetails';
import Cart from './components/cart/Cart';
import Checkout from './components/checkout/Checkout';
import SearchResults from './components/search/SearchResults';
import PageNotFound from './components/page-not-found/PageNotFound';
import ScrollToTop from './components/scroll-to-top/ScrollToTop';
import CartProvider from './providers/cartProvider';

function App() {

  return (
    <CartProvider>
      <ScrollToTop />
      <NavbarMenu />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/artshop' element={<ArtShop />} />
        <Route path='/artshop/details/:paintingId' element={<PaintingDetails />} />
        <Route path='/portfolio' element={<Portfolio />} />
        <Route path='/portfolio/details/:paintingId' element={<PaintingDetails />} />
        <Route path='/about' element={<About />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/search' element={<SearchResults />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>

      <Footer />
    </CartProvider>
  )
}

export default App
