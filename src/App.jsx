import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react'

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

const AdminLayout = lazy(() => import('./layouts/admin-layout/AdminLayout'));
const Dashboard = lazy(() => import('./components/admin/dashboard/Dashboard'));
const Orders = lazy(() => import('./components/admin/orders/Orders'));
const Paintings = lazy(() => import('./components/admin/paitings/Paintings'));
const Categories = lazy(() => import('./components/admin/categories/Categories'));
const Size = lazy(() => import('./components/admin/size/Size'));
const Inquiry = lazy(() => import('./components/admin/inquiry/Inquiry'));
const ContactMessages = lazy(() => import('./components/admin/contact-messages/ContactMessages'));
const Settings = lazy(() => import('./components/admin/settings/Settings'));
const AboutAdmin = lazy(() => import('./components/admin/about/AboutAdmin'));
const Login = lazy(() => import('./components/admin/login/Login'));

import PaymentSuccess from './components/checkout/payment-success/PaymentSuccess';

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
        <Route path='/payment-success' element={<PaymentSuccess />} />
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
        <Route path='about' element={<AboutAdmin />} />
        <Route path='settings' element={<Settings />} />
      </Route>
      <Route path='/admin/login' element={<Login />} />

      <Route path='*' element={<PageNotFound />} />

    </Routes>
  )
}

export default App
