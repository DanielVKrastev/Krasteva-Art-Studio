import { Route, Routes } from 'react-router-dom';
import NavbarMenu from './components/navbar-menu/NavbarMenu';
import "./App.css";

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
