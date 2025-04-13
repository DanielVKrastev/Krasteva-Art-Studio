import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-gray-300 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div>
            <h3 className="text-lg font-semibold mb-4">Навигация</h3>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
              <li><Link to="/" className="hover:text-indigo-600">Начало</Link></li>
              <li><Link to="/artshop" className="hover:text-indigo-600">Магазин</Link></li>
              <li><Link to="/portfolio" className="hover:text-indigo-600">Портфолио</Link></li>
              <li><Link to="/about" className="hover:text-indigo-600">За мен</Link></li>
              <li><Link to="/contact" className="hover:text-indigo-600">Контакти</Link></li>
              <li><Link to="#" className="hover:text-indigo-600">Количка</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Абониране</h3>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
              <input
                type="text"
                placeholder="Имейл"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm"
              >
                Изпрати
              </button>
            </form>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Контакти</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-600">България, Попово, ул. Фейк</li>
              <li><a href="tel://23923929210" className="text-indigo-600 hover:underline">+359 89 392 9210</a></li>
              <li className="text-gray-600">info@krastevagallery.com</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Последвай ни:</h3>
            <div className="flex space-x-4">
              <a href="#"><img width="40" height="40" src="https://img.icons8.com/color/48/facebook-new--v1.png" alt="Facebook" /></a>
              <a href="#"><img width="40" height="40" src="https://img.icons8.com/color/48/instagram-new--v1.png" alt="Instagram" /></a>
              <a href="#"><img width="40" height="40" src="https://img.icons8.com/color/48/twitterx--v1.png" alt="Twitter" /></a>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="mt-12 border-t pt-6 text-center text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} Krasteva Art Gallery. Всички права запазени | Уеб дизайн Daniel Krastev
          </p>
        </div>
      </div>
    </footer>
  );
}

