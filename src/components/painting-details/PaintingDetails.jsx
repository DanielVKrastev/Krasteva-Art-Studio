import { Link, useNavigate, useParams } from "react-router-dom";
import PhoneInput from "react-phone-number-input/input";
import { useEffect, useState } from "react";

import paintingApi from "../../api/paintingApi";

import NewArts from "../partials/new-arts/NewArts";
import useActiveSection from "../../hooks/useActiveSection";
import { useCartContext } from "../../contexts/CartContext";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import availabilityInquiryApi from "../../api/availabilityInquiryApi";
import MessageToast from "../partials/message-toast/MessageToast";
import LoadingSpinner from "../partials/loading-spinner/LoadingSpinner";

export default function PaintingDetails() {
    const [painting, setPainting] = useState({});
    const [showMessageToast, setMessageShowToast] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [phoneValue, setPhoneValue] = useState('+359');

    const { paintingId } = useParams();

    const { cart, setCart } = useCartContext();

    const navigate = useNavigate();

    const [activeSection] = useActiveSection();

    useEffect(() => {
        (async function () {
            setIsLoading(true);
            const painting = await paintingApi.getOne(paintingId);
            setIsLoading(false);
            setPainting(painting);

            if (!painting) {
                navigate(`/${activeSection}`); //redirect when id is incorrect
                return;
            }
        })();

        if (activeSection === 'artshop' && painting?.sold === 'yes') {
            navigate('/artshop');
        }
    }, [paintingId]);

    useEffect(() => {
        if (activeSection === 'artshop' && painting?.sold === 'yes') {
            navigate('/artshop'); //redirect when painting is sold
        }
    }, [painting, activeSection, navigate]);

    const handleBuyPainting = (painting) => {
        setCart(painting); // set in local storage cart item
        navigate('/cart');
    };

    const handleAddInCart = (painting) => {
        setCart(painting); // set in local storage cart item
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        if (formData.get('telephone').length < 14) {
            setMessageShowToast({ type: 'error', content: 'Моля въведете валиден телефонен номер.' });
            return;
        }
        
        setIsLoading(true);
        let inquiryData = Object.fromEntries(formData);
        inquiryData = {
            paintingId,
            answered: 'no',
            ...inquiryData,
        }

        try {
            await availabilityInquiryApi.create(inquiryData);
            setMessageShowToast({ type: 'success', content: 'Успешно изпратено запитване' });
        } catch (err) {
            setMessageShowToast({ type: 'error', content: 'Грешка в изпращането на запитване' });
            console.log(err.message);
        } finally {
            setPhoneValue('+359');
            e.target.reset();
            setIsLoading(false);
        }
    };

    return (
        <>
            {isLoading && <LoadingSpinner />}

            {showMessageToast && <MessageToast
                message={showMessageToast}
                onClose={setMessageShowToast}
            />}
            <div className="container mx-auto py-8 mb-30">
                {/* Breadcrumb */}
                <div className="mb-6 text-sm text-gray-500">
                    <Link to="/" className="text-indigo-600 hover:underline">Начало</Link>
                    <span className="mx-2">/</span>
                    <Link
                        to={activeSection === 'artshop' ? '/artshop' : '/portfolio'}
                        className="text-indigo-600 hover:underline"
                    >
                        {activeSection === 'artshop' && 'Арт магазин'} {activeSection === 'portfolio' && 'Портфолио'}
                    </Link>
                    <span className="mx-2">/</span>
                    <span className="text-black font-semibold">{painting?.name}</span>
                </div>

                {/* Painting Section */}
                <div className="flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0">
                    {/* Image Section */}
                    <div className="flex-1 md:w-1/2">
                        <img src={painting?.imageUrl} alt={painting?.name} className="w-full h-auto rounded-lg shadow-lg" />
                    </div>

                    {/* Description Section */}
                    <div className="flex-1 md:w-1/2 px-6">
                        <h2 className="text-3xl font-bold text-black">{painting?.name}</h2>
                        <p className="mt-4 text-gray-600">{painting?.description}</p>

                        <div className="mt-6 space-y-2">
                            <p><i><b>Размери: {painting?.size}</b></i></p>
                            <p><i><b>Категория: {painting?.category}</b></i></p>
                            <p><i><b>Бои: {painting?.paints}</b></i></p>
                        </div>

                        {painting?.sold !== 'yes' ?
                            <>
                                <p className="mt-4 text-2xl text-primary font-semibold text-indigo-600">Цена: {painting?.price} лв. / {(painting?.price / 1.95583).toFixed(2) } €</p>

                                <div className="mt-6 flex gap-2">
                                    <button onClick={() => handleBuyPainting(painting)} className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 cursor-pointer">Купи</button>
                                    <button
                                        onClick={() => handleAddInCart(painting)}
                                        className="px-4 py-1 text-sm border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-100 cursor-pointer flex items-center gap-1"
                                    >
                                        <ShoppingCartIcon className="w-5 h-5 text-indigo-700" />
                                        Добави
                                    </button>
                                </div>
                            </>
                            :

                            <div className="mt-6">
                                <p className="mb-4">
                                    Направете запитване за поръчка.<br />
                                    Или се обадете на: <span className="font-semibold">+359 11 111 1111</span>
                                </p>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="flex flex-col md:flex-row md:space-x-4">
                                        <div className="flex-1">
                                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                                                Име <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                id="firstName"
                                                name="firstName"
                                                type="text"
                                                required
                                                className="bg-white w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                placeholder="Име"
                                            />
                                        </div>

                                        <div className="flex-1 mt-4 md:mt-0">
                                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                                                Фамилия <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                id="lastName"
                                                name="lastName"
                                                type="text"
                                                required
                                                className="bg-white w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                placeholder="Фамилия"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col md:flex-row md:space-x-4">
                                        <div className="flex-1">
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                                Имейл <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                required
                                                className="bg-white w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                placeholder="example@example.com"
                                            />
                                        </div>

                                        <div className="flex-1 mt-4 md:mt-0">
                                            <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-1">
                                                Телефон <span className="text-red-500">*</span>
                                            </label>
                                            <PhoneInput
                                                className="bg-white w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                name="telephone"
                                                value={phoneValue}
                                                onChange={setPhoneValue}
                                                placeholder="+359..."
                                                required
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition duration-300"
                                    >
                                        Направи запитване
                                    </button>
                                </form>
                            </div>
                        }


                    </div>
                </div>
            </div>

            <NewArts />
        </>
    );
};
