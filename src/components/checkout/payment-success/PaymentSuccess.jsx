import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
    const location = useLocation();
    const navigate = useNavigate();
    const { order } = location.state || {};

    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
                <div className="w-full max-w-2xl p-12 mx-4 text-center transition-all transform bg-white shadow-lg rounded-xl hover:shadow-xl">
                    {/* Success Icon */}
                    <div className="flex items-center justify-center w-24 h-24 mx-auto mb-8 bg-green-100 rounded-full">
                        <svg
                            className="w-12 h-12 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                    {/* Main Content */}
                    <h1 className="mb-6 text-4xl font-extrabold text-green-600">
                        Успешно направена поръчка
                    </h1>
                    <p className="mb-8 text-xl text-gray-700">Благодарим ви за поръчката. Ще получите имейл с повече информация.</p>
                    <div className="p-6 mb-8 rounded-lg bg-blue-50">
                        <p className="text-lg font-medium text-blue-700">
                            Ще се свържем скоро с Вас.
                        </p>
                    </div>
                    <p className="text-xl font-medium text-indigo-700">
                            Вашите данни: 
                        </p>
                    <div className="p-6 mb-8 rounded-lg bg-indigo-100">
                        <p className="text-lg font-medium text-indigo-700">
                            Имейл: {order?.email}
                        </p>
                        <p className="text-lg font-medium text-indigo-700">
                            Имена: {order?.firstName} {order?.lastName}
                        </p>
                        <p className="text-lg font-medium text-indigo-700">
                            Телефон: {order?.telephone}
                        </p>
                        <p className="text-lg font-medium text-indigo-700">
                            Адрес: гр./с. {order?.town} / {order?.address}
                        </p>
                    </div>
                    {/* Contact Information */}
                    <div className="pt-8 mt-8 border-t border-gray-100">
                        <p className="text-lg text-gray-700">Имате въпроси? Връзка с нас:</p>
                        <a
                            href="krasteva-art-studio@gmail.com"
                            className="inline-block mt-2 text-xl font-medium text-blue-600 transition-colors duration-200 hover:text-blue-800"
                        >
                            krasteva-art-studio@gmail.com
                        </a>
                    </div>
                    {/* Back to Home Button */}
                    <div className="mt-12">
                        <Link
                            to="/"
                            className="inline-block px-8 py-4 text-lg font-semibold text-white transition-colors duration-200 bg-green-600 rounded-lg hover:bg-green-700"
                        >
                            Начална страница
                        </Link>
                    </div>
                </div>
            </div>

        </>
    );
}