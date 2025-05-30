import { Link } from "react-router";

export default function PageNotFound() {
    return (
        <section>
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 md:h-[calc(80vh-50px)]">
                {/* Breadcrumb */}
                                <div className="mb-6 text-sm text-gray-500">
                                    <Link to="/" className="text-indigo-600 hover:underline">Начало</Link>
                                    <span className="mx-2">/</span>
                                    <span className="text-black font-semibold">Страницата не беше открита</span>
                                </div>
                <div className="mx-auto max-w-screen-sm text-center">
                    <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl md:text-indigo-900">404</h1>
                    <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">
                        Нещо липсва.
                    </p>
                    <p className="mb-4 text-lg font-light text-gray-500">
                        Страницата която търсите не може да бъде намерена
                    </p>
                    <Link to="/" className="relative inline-flex items-center justify-center p-4 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-100 rounded-lg group bg-gradient-to-br from-indigo-900 to-indigo-300 group-hover:from-indigo-900 group-hover:to-indigo-300 hover:text-white focus:ring-4 focus:outline-none focus:ring-pink-200">
                        Kъм начална страница
                    </Link>
                </div>
            </div>
        </section>

    );
}