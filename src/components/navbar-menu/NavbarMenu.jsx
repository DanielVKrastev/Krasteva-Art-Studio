import { Link } from 'react-router-dom';

export default function NavbarMenu() {
  return (
    <header className="bg-white shadow">
      {/* Top bar */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-2 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0">
            {/* Search */}
            <div className="w-full md:w-1/3">
              <form className="relative">
                <input
                  type="text"
                  placeholder="Търси"
                  className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
                <span className="absolute left-3 top-2.5 text-gray-400">
                  🔍
                </span>
              </form>
            </div>

            {/* Logo */}
            <div className="text-center w-full md:w-1/3">
              <Link to="/" className="text-2xl font-bold text-gray-800 hover:text-indigo-600 transition">
                Krasteva Gallery
              </Link>
            </div>

            {/* Icons */}
            <div className="flex items-center justify-end w-full md:w-1/3 space-x-4">
              <Link to="#" className="text-gray-600 hover:text-indigo-600 text-xl">👤</Link>
              <Link to="#" className="text-gray-600 hover:text-indigo-600 text-xl">❤️</Link>
              <Link to="/cart" className="relative text-gray-600 hover:text-indigo-600 text-xl">
                🛒
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  2
                </span>
              </Link>
              <button className="md:hidden text-gray-600 hover:text-indigo-600 text-xl">
                ☰
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="hidden md:flex justify-center space-x-8 py-4 text-sm font-medium text-gray-700">
            <li><Link to="/" className="hover:text-indigo-600">Начало</Link></li>
            <li><Link to="/artshop" className="hover:text-indigo-600">Магазин</Link></li>
            <li><Link to="/portfolio" className="hover:text-indigo-600">Портфолио</Link></li>
            <li><Link to="/about" className="hover:text-indigo-600">За мен</Link></li>
            <li><Link to="/contact" className="hover:text-indigo-600">Контакти</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
