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
              <li><Link to="/about" className="hover:text-indigo-600">Контакти</Link></li>
              <li><Link to="/cart" className="hover:text-indigo-600">Количка</Link></li>
            </ul>
          </div>
          {/* TODO: Email subscription
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
          */}

          <div>

          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Контакти</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-600">България, Попово, ул. Ястребино 4</li>
              <li><a href="tel:+359897796887" className="text-indigo-600 hover:underline">+359 89 779 6887</a></li>
              <li className="text-gray-600">
                <a href="mailto:krasteva.art.studio@gmail.com" className="text-indigo-600 hover:underline">
                  krasteva.art.studio@gmail.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Последвай ме:</h3>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/share/1YDS3DiE7F/" target="_blank"><img width="40" height="40" src="https://img.icons8.com/color/48/facebook-new--v1.png" alt="Facebook" /></a>
              <a href="https://www.instagram.com/loved._.in._.sun/" target="_blank"><img width="40" height="40" src="https://img.icons8.com/color/48/instagram-new--v1.png" alt="Instagram" /></a>
              <a href="https://www.tiktok.com/@el0_v?_t=ZN-8wRNHs95peo&_r=1" target="_blank"><img width="40" height="40" src="https://img.icons8.com/color/48/tiktok--v1.png" alt="TikTok" /></a>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="mt-12 border-t pt-6 text-center text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} Krasteva Art Studio. Всички права запазени | Уеб дизайн Daniel Krastev
          </p>
        </div>
      </div>
    </footer>
  );
}

