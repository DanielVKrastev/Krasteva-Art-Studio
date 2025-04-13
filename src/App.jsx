import { Route, Routes } from 'react-router-dom';
import NavbarMenu from './components/navbar-menu/NavbarMenu';
import Footer from './components/footer/Footer';

function App() {

  return (
    <>
      <NavbarMenu />

      <Routes>
        <Route path='/' element={<h1>hello</h1>} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
