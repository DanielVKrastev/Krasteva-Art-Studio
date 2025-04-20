import { Link } from "react-router-dom";
import { useCartContext } from "../../contexts/CartContext";

export default function Cart() {

    const { cart: cartItems, setCart, removeFromCart } = useCartContext();;

    const totalPrice = cartItems.reduce((sum, item) => sum + Number(item.price), 0);

    const handleRemoveItem = (id) => {
        removeFromCart(id);
    }

    return (
        <div className="container mx-auto py-10 px-4 md:px-8">
            <h1 className="text-3xl font-bold text-black mb-6 border-l-4 border-indigo-600 pl-4">Вашата количка</h1>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Left: Cart Items */}
                <div className="flex-1 space-y-6">
                    {cartItems.map(item => (
                        <div
                            key={item.id}
                            className="flex items-center justify-between p-4 border border-gray-300 rounded-lg shadow-sm bg-white"
                        >
                            <div className="flex items-center space-x-4">
                                <img src="/images/test_draw.jpg" alt={item.name} className="w-24 h-24 object-cover rounded" />
                                <div>
                                    <h2 className="text-lg font-semibold">{item.name}</h2>
                                    <p className="text-gray-600">{item.price} лв.</p>
                                </div>
                            </div>
                            <button onClick={() => handleRemoveItem(item.id)} className="text-red-500 hover:underline text-sm">
                                Премахни
                            </button>
                        </div>
                    ))}
                </div>

                {/* Right: Summary */}
                <div className="w-full h-min md:w-1/3 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Обобщение</h2>
                    <div className="space-y-2">
                        <p className="flex justify-between">
                            <span>Брой картини:</span>
                            <span>{cartItems.length}</span>
                        </p>
                        <p className="flex justify-between">
                            <span>Доставка:</span>
                            <span>Безплатна доставка</span>
                        </p>
                        <p className="flex justify-between font-medium text-lg">
                            <span>Общо:</span>
                            <span>{totalPrice} лв.</span>
                        </p>
                    </div>


                    <div className="mt-6 flex gap-2">
                        <Link type="button" to="/artshop" className="px-4 py-1 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-100">Разгледай още</Link>
                        <Link type="button" to={`/checkout`} className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">Към поръчка</Link>
                    </div>

                    <p className="text-xs text-gray-500 mt-2">
                        * Следващата стъпка ще ви отведе към финализиране на поръчката.
                    </p>
                </div>
            </div>
        </div>
    );
}
