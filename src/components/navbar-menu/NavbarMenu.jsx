import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import useActiveSection from '../../hooks/useActiveSection';
import { useCartContext } from '../../contexts/CartContext';

export default function NavbarMenu() {
  const [openMobileNav, setOpenMobileNav] = useState(true);
  const navigate = useNavigate();

  // for count items in cart
  const { cart: cartItems } = useCartContext();

  const [activeSection] = useActiveSection();

  function closeOpenHandlerMobileMenu() {
    setOpenMobileNav(state => !state);
  };

  function submitHandlerSearch(e) {
    e.preventDefault();
    closeOpenHandlerMobileMenu();
    const formData = new FormData(e.target);
    const searchParams = formData.get('search');
    e.target.reset();

    if (!searchParams) {
      return;
    }

    navigate(`/search?query=${searchParams}`);
  }

  return (
    <nav className="sticky top-0 bg-white w-full z-50 border-b border-gray-200 transition-all duration-300">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="/images/krasteva-art-studio-logo.png"
            className="w-25"
            alt="Krasteva Logo"
          />
        </Link>

        <div className="flex md:order-2">

          <div className="relative hidden md:block">
            <form id="search-form" onSubmit={submitHandlerSearch}>
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search icon</span>
              </div>
              <input
                type="text"
                id="search"
                name="search"
                className="block w-full p-2 ps-10 text-sm text-indigo-900 border border-indigo-300 rounded-lg bg-gray-50 focus:ring-indigo-700 focus:border-indigo-700"
                placeholder="Тъсене..."
              />
            </form>
          </div>

          <div className="relative ml-8">
            <Link to="/cart"><ShoppingCartIcon className="mr-2 w-8 h-8 text-indigo-700" /></Link>

            <span className="absolute mr-2 -top-2 -right-2 bg-red-600 text-white text-xs font-semibold rounded-full px-1.5 py-0.5">
              {cartItems.length}
            </span>
          </div>
          <button
            data-collapse-toggle="navbar-search"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-search"
            aria-expanded="false"
            onClick={closeOpenHandlerMobileMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        <div
          className={openMobileNav ?
            "items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            : "items-center justify-between w-full md:flex md:w-auto md:order-1"}
          id="navbar-search"
        >
          <div className="relative mt-3 md:hidden">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <form onSubmit={submitHandlerSearch}>
              <input
                type="text"
                id="search"
                name="search"
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-indigo-700 focus:border-indigo-700"
                placeholder="Търсене..."
              />
            </form>

          </div>

          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
            <li>
              <Link
                to="/"
                className={
                  activeSection === '' ? "block py-2 px-3 text-white bg-indigo-700 rounded-sm md:bg-transparent md:text-indigo-700 md:p-0"
                    : "block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-indigo-700 md:p-0"
                }
                aria-current="page"
                onClick={closeOpenHandlerMobileMenu}
              >
                Начало
              </Link>
            </li>
            <li>
              <Link
                to="/artshop"
                className={
                  activeSection === 'artshop' ? "block py-2 px-3 text-white bg-indigo-700 rounded-sm md:bg-transparent md:text-indigo-700 md:p-0"
                    : "block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-indigo-700 md:p-0"
                }
                aria-current="page"
                onClick={closeOpenHandlerMobileMenu}
              >
                Магазин
              </Link>
            </li>
            <li>
              <Link
                to="/portfolio"
                className={
                  activeSection === 'portfolio' ? "block py-2 px-3 text-white bg-indigo-700 rounded-sm md:bg-transparent md:text-indigo-700 md:p-0"
                    : "block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-indigo-700 md:p-0"
                }
                aria-current="page"
                onClick={closeOpenHandlerMobileMenu}
              >
                Портфолио
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={
                  activeSection === 'about' ? "block py-2 px-3 text-white bg-indigo-700 rounded-sm md:bg-transparent md:text-indigo-700 md:p-0"
                    : "block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-indigo-700 md:p-0"
                }
                onClick={closeOpenHandlerMobileMenu}
              >
                За мен
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
