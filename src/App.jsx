import { Route, Routes } from 'react-router-dom';
import NavbarMenu from './components/navbar-menu/NavbarMenu';
import "./App.css";
import Footer from './components/footer/Footer';
import Home from './components/Home/home';
import ArtShop from './components/art-shop/ArtShop';
import Portfolio from './components/portfolio/Portfolio';
import About from './components/about/About';

function App() {

  return (
    <>
      <NavbarMenu />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/artshop' element={<ArtShop />} />
        <Route path='/portfolio' element={<Portfolio />} />
        <Route path='/about' element={<About />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
