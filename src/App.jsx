import { Route, Routes } from 'react-router-dom';
import NavbarMenu from './components/navbar-menu/NavbarMenu';
import "./App.css";
import Footer from './components/footer/Footer';
import Home from './components/Home/home';
import ArtShop from './components/art-shop/ArtShop';

function App() {

  return (
    <>
      <NavbarMenu />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/artshop' element={<ArtShop />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
