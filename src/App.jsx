import { Route, Routes } from 'react-router-dom';
import NavbarMenu from './components/navbar-menu/NavbarMenu';
import "./App.css";
import Footer from './components/footer/Footer';
import Home from './components/Home/home';
import ArtShop from './components/art-shop/ArtShop';
import Portfolio from './components/portfolio/Portfolio';
import About from './components/about/About';
import PaintingDetails from './components/art-shop/painting-details/PaintingDetails';
import PaintingDetailsPortfolio from './components/portfolio/painting-details/PaintingDetailsPortfolio';
import Cart from './components/cart/Cart';
import Checkout from './components/checkout/Checkout';

function App() {

  return (
    <>
      <NavbarMenu />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/artshop' element={<ArtShop />} />
        <Route path='/artshop/details/:paintingId' element={<PaintingDetails />} />
        <Route path='/portfolio' element={<Portfolio />} />
        <Route path='/portfolio/details/:paintingId' element={<PaintingDetailsPortfolio />} />
        <Route path='/about' element={<About />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
