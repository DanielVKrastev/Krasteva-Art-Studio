import { Link } from 'react-router-dom';
import { Navbar, NavbarCollapse, NavbarLink} from "flowbite-react";
import { useState } from 'react';

export default function NavbarMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="site-navbar bg-white border-b border-gray-200">
      {/* Site Navbar Top */}
      <div className="site-navbar-top py-3 bg-gray-50">
        <div className="container mx-auto flex justify-between items-center">
          {/* Search Bar */}
          <form class="max-w-md mx-auto">   
    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
        <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>
</form>

          {/* Logo */}
          <div className="text-center w-1/3">
            <div className="site-logo">
              <Link to="/" className="js-logo-clone text-xl font-semibold text-gray-800">
                Krasteva Gallery
              </Link>
            </div>
          </div>

          {/* Cart & Menu Toggle */}
          <div className="flex items-center space-x-3 w-1/3 justify-end">
            <div className="site-top-icons flex space-x-4">
              <ul className="flex space-x-4">
                <li>
                  <Link to="/cart" className="site-cart text-gray-800">
                    <span className="icon icon-shopping_cart"></span>
                    <span className="count">2</span>
                  </Link>
                </li>
                <li className="md:hidden">
                  <button 
                    onClick={() => setIsOpen(!isOpen)} 
                    className="site-menu-toggle text-gray-800"
                  >
                    <span className="icon-menu"></span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <Navbar fluid rounded className="site-navigation bg-white dark:bg-gray-100">
        <NavbarCollapse className={`${isOpen ? 'block' : 'hidden'} md:flex`}>
          <NavbarLink as={Link} to="/" className="text-gray-800 hover:text-blue-600 active:text-blue-600">
            Начало
          </NavbarLink>
          <NavbarLink as={Link} to="/artshop" className="text-gray-800 hover:text-blue-600">
            Магазин
          </NavbarLink>
          <NavbarLink as={Link} to="/portfolio" className="text-gray-800 hover:text-blue-600">
            Портфолио
          </NavbarLink>
          <NavbarLink as={Link} to="/about" className="text-gray-800 hover:text-blue-600">
            За мен
          </NavbarLink>
          <NavbarLink as={Link} to="/contact" className="text-gray-800 hover:text-blue-600">
            Контакти
          </NavbarLink>
        </NavbarCollapse>
      </Navbar>
    </header>
  );
}
