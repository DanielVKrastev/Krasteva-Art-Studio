import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCartContext } from "../../contexts/CartContext";
import orderApi from "../../api/orderApi";
import paintingApi from "../../api/paintingApi";
import sendEmail from "../../utils/sendEmail";
import PhoneInput from "react-phone-number-input/input";
import MessageToast from "../partials/message-toast/MessageToast";
import LoadingSpinner from "../partials/loading-spinner/LoadingSpinner";

export default function Checkout() {
    const [phoneValue, setPhoneValue] = useState('+359');
    const [isLoading, setIsLoading] = useState(false);
    const [showMessageToast, setMessageShowToast] = useState(false);

    const { cart: cartItems, setCart, removeFromCart } = useCartContext();
    const total = (cartItems.reduce((sum, item) => sum + Number(item.price), 0));
    const isCartEmpty = cartItems.length === 0;

    const navigate = useNavigate();

    const [deliveryMethod, setDeliveryMethod] = useState("econt");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isCartEmpty) {
            return;
        }

        const formData = new FormData(e.currentTarget);

        if (formData.get('telephone').length < 14) {
            setMessageShowToast({ type: 'error', content: 'Моля въведете валиден телефонен номер.' });
            return;
        }

        let orderData = Object.fromEntries(formData);
        orderData = {
            ...orderData,
            totalPrice: total.toFixed(2)
        }

        const paintingIds = cartItems.map(painting => painting.id);
        try {
            setIsLoading(true);

            const unavailable = await paintingApi.checkCartAvailability(cartItems);

            if (unavailable.length > 0) {
                unavailable.forEach(paintingId => {
                    removeFromCart(paintingId);
                });

                setMessageShowToast({
                    type: 'error',
                    content: 'Някои продукти вече са продадени и бяха премахнати от количката.'
                });
                setIsLoading(false);
                return;
            }

            const order = await orderApi.create(orderData, paintingIds);
            await paintingApi.markAsSold(order.paintingIds);

            const templateId = 'template_9m3m9nu';

            const itemsHTML = cartItems.map((painting) => `
            <div style="display: flex; align-items: center; margin-bottom: 20px; border-bottom: 1px solid #ddd; padding-bottom: 10px;">
                <img src="${painting.imageUrl}" alt="${painting.name}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px; margin-right: 15px;" />
                <div>
                <p style="margin: 0; font-size: 16px; font-weight: bold;">${painting.name}</p>
                <p style="margin: 5px 0; color: #6b7280;">${painting.description || ''}</p>
                <p style="margin: 0; font-size: 15px; color: #111827;">Цена: <strong>${painting.price} лв.</strong></p>
                </div>
            </div>
            `).join('');

            const templateParams = {
                name: 'Krasteva Art Studio',
                email: order.email,
                firstName: order.firstName,
                lastName: order.lastName,
                telephone: order.telephone,
                town: order.town,
                address: order.address,
                delivery: order.delivery,
                itemsHTML
            };

            const sendReply = await sendEmail(templateId, templateParams);
            if (!sendReply) {
                throw new Error('Грешка при изпращане на имейл.');
            }

            navigate("/payment-success", { state: { order: orderData } });
            setCart();
        } catch (err) {
            console.log(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {showMessageToast && <MessageToast
                message={showMessageToast}
                onClose={setMessageShowToast}
            />}

            {isLoading && <LoadingSpinner />}

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
                                    <input required type="text" name="firstName" className="w-full border rounded p-2" placeholder="Име" />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700">Фамилия <span className="text-red-500">*</span></label>
                                    <input required type="text" name="lastName" className="w-full border rounded p-2" placeholder="Фамилия" />
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700">Имейл <span className="text-red-500">*</span></label>
                                    <input required type="email" name="email" className="w-full border rounded p-2" placeholder="example@example.com" />
                                </div>

                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700">Телефон <span className="text-red-500">*</span></label>
                                    <PhoneInput
                                        className="w-full border rounded-md p-2 focus:ring-2 focus:ring-indigo-500"
                                        name="telephone"
                                        value={phoneValue}
                                        onChange={setPhoneValue}
                                        placeholder="+359..."
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700">Населено място <span className="text-red-500">*</span></label>
                                    <input required type="text" name="town" className="w-full border rounded p-2" placeholder="гр./с." />
                                </div>

                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700">Пощенски код <span className="text-red-500">*</span></label>
                                    <input type="number" required name="postCode" className="w-full border rounded p-2" placeholder="1000" />
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-10">
                                    <label className="block text-sm font-medium text-gray-700">Адрес <span className="text-red-500">*</span></label>
                                    <input type="text" name="address" className="w-full border rounded p-2" placeholder="Адрес" />
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
                            {cartItems.map(painting => (
                                <div key={painting.id} className="flex items-center gap-4 border-b border-gray-300 pb-4">
                                    <img
                                        src={painting.imageUrl}
                                        alt={painting.name}
                                        className="w-16 h-16 object-cover rounded-md shadow-sm"
                                    />
                                    <div className="flex justify-between items-center w-full">
                                        <div className="text-sm">
                                            <p className="font-medium text-gray-800">{painting.name}</p>
                                            <p className="text-gray-500">{painting.size}</p>
                                        </div>
                                        <div className="text-base font-semibold text-gray-700">
                                            {painting.price} лв. / {(painting?.price / 1.95583).toFixed(2)} €
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between text-lg font-semibold mt-6 pt-4 border-gray-500  border-t text-gray-700">
                            <span>Общо:</span>
                            <span>{total.toFixed(2)} лв. / {(total / 1.95583).toFixed(2)} €</span>
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
                                className={`${isCartEmpty ? `bg-gray-300` : `bg-indigo-600 hover:bg-indigo-700`} text-white px-6 py-2 rounded-lg  transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 cursor-pointer`}
                                disabled={isCartEmpty}
                            >
                                Продължи
                            </button>
                        </div>
                    </div>



                </div>
            </div>
        </>
    );
}
