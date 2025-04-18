import { useState } from "react";
import { Link } from "react-router-dom";

const cartItems = [
    {
        id: 1,
        name: "Пейзаж в утро",
        size: "20x30 см",
        price: 180,
        imageUrl: "https://example.com/art1.jpg"
    },
    {
        id: 2,
        name: "Абстрактно лято",
        size: "30x40 см",
        price: 220,
        imageUrl: "https://example.com/art2.jpg"
    },
    {
        id: 3,
        name: "Абстрактно лято",
        size: "30x40 см",
        price: 220,
        imageUrl: "https://example.com/art2.jpg"
    },
    {
        id: 4,
        name: "Абстрактно лято",
        size: "30x40 см",
        price: 220,
        imageUrl: "https://example.com/art2.jpg"
    },
];

export default function Checkout() {
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    const [deliveryMethod, setDeliveryMethod] = useState("econt");

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Поръчката е приета!");
    };

    return (
        <div className="container mx-auto py-10 px-4 md:px-8">
            <h1 className="text-3xl font-bold text-black mb-6 border-l-4 border-indigo-600 pl-4">Финализиране на поръчка</h1>

            <div className="flex flex-col md:flex-row gap-8">

                {/* Left: Customer & Delivery Form */}
                <div className="flex-1 h-min space-y-6 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Данни за доставка</h2>
                    <form onSubmit={handleSubmit} id="checkout-form" className="space-y-4">
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700">Име <span className="text-red-500">*</span></label>
                                <input required type="text" name="firstName" className="w-full border rounded p-2" />
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700">Фамилия <span className="text-red-500">*</span></label>
                                <input required type="text" name="lastName" className="w-full border rounded p-2" />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700">Имейл <span className="text-red-500">*</span></label>
                                <input required type="email" name="email" className="w-full border rounded p-2" />
                            </div>

                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700">Телефон <span className="text-red-500">*</span></label>
                                <input required type="text" name="telephone" className="w-full border rounded p-2" />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700">Населено място <span className="text-red-500">*</span></label>
                                <input required type="text" name="town" className="w-full border rounded p-2" />
                            </div>

                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700">Пощенски код <span className="text-red-500">*</span></label>
                                <input type="number" required name="postCode" className="w-full border rounded p-2" />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-10">
                                <label className="block text-sm font-medium text-gray-700">Адрес <span className="text-red-500">*</span></label>
                                <input type="text" name="address" className="w-full border rounded p-2" />
                            </div>

                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Метод за доставка</label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="delivery"
                                        value="econt"
                                        checked={deliveryMethod === "econt"}
                                        onChange={() => setDeliveryMethod("econt")}
                                    />
                                    Еконт
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="delivery"
                                        value="speedy"
                                        checked={deliveryMethod === "speedy"}
                                        onChange={() => setDeliveryMethod("speedy")}
                                    />
                                    Спиди
                                </label>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Right: Cart Summary */}
                <div className="w-full h-min md:w-1/3 bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
                    <h2 className="text-xl font-semibold mb-6 text-gray-800">Вашите артикули</h2>

                    <div className="space-y-5">
                        {cartItems.map(item => (
                            <div key={item.id} className="flex items-center gap-4 border-b border-gray-300 pb-4">
                                <img
                                    src="/images/test_draw.jpg"
                                    alt={item.name}
                                    className="w-16 h-16 object-cover rounded-md shadow-sm"
                                />
                                <div className="flex justify-between items-center w-full">
                                    <div className="text-sm">
                                        <p className="font-medium text-gray-800">{item.name}</p>
                                        <p className="text-gray-500">{item.size}</p>
                                    </div>
                                    <div className="text-base font-semibold text-gray-700">
                                        {item.price} лв.
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between text-lg font-semibold mt-6 pt-4 border-gray-500  border-t text-gray-700">
                        <span>Общо:</span>
                        <span>{total} лв.</span>
                    </div>

                    <div className="mt-6 flex gap-2">
                        <Link
                            to="/cart"
                            className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition"
                        >
                            Назад
                        </Link>
                        <button
                            form="checkout-form"
                            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                        >
                            Продължи
                        </button>
                    </div>
                </div>



            </div>
        </div>
    );
}
