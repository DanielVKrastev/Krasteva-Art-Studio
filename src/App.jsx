import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavbarMenu from './components/navbar-menu/NavbarMenu';

function App() {

  return (
    <>
      <NavbarMenu />

      <Routes>
        <Route path='/' element={<h1>hello</h1>} />
      </Routes>
    </>
  )
}

export default App
