import { Route, Routes } from 'react-router-dom';
import "./App.css";

import Home from './components/home/Home';
import ArtShop from './components/art-shop/ArtShop';
import Portfolio from './components/portfolio/Portfolio';
import About from './components/about/About';
import PaintingDetails from './components/painting-details/PaintingDetails';
import Cart from './components/cart/Cart';
import Checkout from './components/checkout/Checkout';
import SearchResults from './components/search/SearchResults';
import PageNotFound from './components/page-not-found/PageNotFound';
import UserLayout from './layouts/user-layout/UserLayout';

import AdminLayout from './layouts/admin-layout/AdminLayout';
import Orders from './components/admin/orders/Orders';
import Paintings from './components/admin/paitings/Paintings';
import Categories from './components/admin/categories/Categories';
import Size from './components/admin/size/Size';
import Inquiry from './components/admin/inquiry/Inquiry';
import ContactMessages from './components/admin/contact-messages/ContactMessages';
import Settings from './components/admin/settings/Settings';
import Dashboard from './components/admin/dashboard/Dashboard';

function App() {

  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/artshop' element={<ArtShop />} />
        <Route path='/artshop/details/:paintingId' element={<PaintingDetails />} />
        <Route path='/portfolio' element={<Portfolio />} />
        <Route path='/portfolio/details/:paintingId' element={<PaintingDetails />} />
        <Route path='/about' element={<About />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/search' element={<SearchResults />} />
      </Route>

      {/* Admin layout */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path='orders' element={<Orders />} />
        <Route path='paintings' element={<Paintings />} />
        <Route path='paintings/categories' element={<Categories />} />
        <Route path='paintings/size' element={<Size />} />
        <Route path='inquiry' element={<Inquiry />} />
        <Route path='contact-messages' element={<ContactMessages />} />
        <Route path='settings' element={<Settings />} />
      </Route>

      <Route path='*' element={<PageNotFound />} />

    </Routes>
  )
}

export default App
