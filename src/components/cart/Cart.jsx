import { Link, useNavigate } from "react-router-dom";
import { useCartContext } from "../../contexts/CartContext";
import paintingApi from "../../api/paintingApi";
import { useState } from "react";
import MessageToast from "../partials/message-toast/MessageToast";

export default function Cart() {

    const { cart: cartItems, setCart, removeFromCart } = useCartContext();
    const totalPrice = cartItems.reduce((sum, item) => sum + Number(item.price), 0);
    const isCartEmpty = cartItems.length === 0;
    const navigate = useNavigate();
    const [showMessageToast, setMessageShowToast] = useState(false);

    const handleRemoveItem = (id) => {
        removeFromCart(id);
    }

    const handleCheckout = async () => {
        const unavailable = await paintingApi.checkCartAvailability(cartItems);
        
        if (unavailable.length > 0) {
            unavailable.forEach(paintingId => {
                removeFromCart(paintingId);
            });

            setMessageShowToast({
                type: 'error',
                content: 'Някои продукти вече са продадени и бяха премахнати от количката.'
            });
            return;
        }

        navigate('/checkout');
    }

    return (
        <>
            {showMessageToast && <MessageToast
                message={showMessageToast}
                onClose={setMessageShowToast}
            />}

            <div className="container mx-auto py-10 px-4 md:px-8">
                <h1 className="text-3xl font-bold text-black mb-6 border-l-4 border-indigo-600 pl-4">Вашата количка</h1>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Left: Cart Items */}
                    <div className="flex-1 space-y-6">
                        {cartItems.length === 0 && <p className="text-gray-600">Вашата количка е празна</p>}
                        {cartItems.map(painting => (
                            <div
                                key={painting.id}
                                className="flex items-center justify-between p-4 border border-gray-300 rounded-lg shadow-sm bg-white"
                            >
                                <div className="flex items-center space-x-4">
                                    <img src={painting.imageUrl} alt={painting.name} className="w-24 h-24 object-cover rounded" />
                                    <div>
                                        <h2 className="text-lg font-semibold">{painting.name}</h2>
                                        <p className="text-gray-600">{painting.price} лв.</p>
                                    </div>
                                </div>
                                <button onClick={() => handleRemoveItem(painting.id)} className="text-red-500 hover:underline text-sm">
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
                                <span>{totalPrice.toFixed(2)} лв.</span>
                            </p>
                        </div>


                        <div className="mt-6 flex gap-2">
                            {isCartEmpty ?
                                <Link type="button" to="/artshop" className={"px-4 py-1 border border-indigo-600 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500"}>Продължи към разглеждане</Link>
                                :
                                <Link type="button" to="/artshop" className={"px-4 py-1 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-100"}>Разгледай още</Link>
                            }
                            <button
                                onClick={handleCheckout}
                                className={`py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 
                                ${isCartEmpty
                                        ? "bg-gray-400 cursor-not-allowed text-white"
                                        : "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500"
                                    }`
                                }
                            >
                                Към поръчка
                            </button>
                        </div>

                        <p className="text-xs text-gray-500 mt-2">
                            * Следващата стъпка ще ви отведе към финализиране на поръчката.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
