import { data, Link } from "react-router-dom";
import PhoneInput from "react-phone-number-input/input";
import contactMessageApi from "../../api/contactMessageApi";
import { useEffect, useState } from "react";
import MessageToast from "../partials/message-toast/MessageToast";
import LoadingSpinner from "../partials/loading-spinner/LoadingSpinner";
import aboutApi from "../../api/aboutApi";

export default function About() {
    const [about, setAbout] = useState([]);
    const [showMessageToast, setMessageShowToast] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [phoneValue, setPhoneValue] = useState('+359');

    useEffect(() => {
        const fetchInitial = async () => {
            setIsLoading(true);
            await aboutApi.getAll()
                .then(result => {
                    setAbout(result[0]);
                    setIsLoading(false);
                }).catch(err => {
                    setIsLoading(false);
                    console.error(err.message);
                });
            return;
        };
        fetchInitial();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        if (formData.get('telephone').length < 14) {
            setMessageShowToast({ type: 'error', content: 'Моля въведете валиден телефонен номер.' });
            return;
        }
        setIsLoading(true);

        const messageData = Object.fromEntries(formData);
        messageData.answered = 'no';
        try {
            await contactMessageApi.create(messageData);
            setMessageShowToast({ type: 'success', content: 'Успешно изпратено съобщение' });
        } catch (err) {
            setMessageShowToast({ type: 'error', content: 'Грешка в изпращането на съобщение' });
            console.log(err.message);
        } finally {
            e.target.reset();
            setPhoneValue('+359');
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
            <div className="bg-gray-100 py-16 px-6 sm:px-16 lg:px-20">
                <div className="container mx-auto px-4 space-y-16">

                    {/* Breadcrumb */}
                    <div className="mb-4 text-sm text-gray-500">
                        <Link to="/" className="text-indigo-600 hover:underline">Начало</Link>
                        <span className="mx-2">/</span>
                        <span className="text-black font-semibold">За нас</span>
                    </div>

                    {/* row 1: Image + text */}
                    <div className="grid md:grid-cols-2 gap-12 items-center bg-white p-6 rounded-lg shadow-md space-y-6">
                        <img
                            src={about?.imageUrl}
                            alt={about?.name}
                            className="rounded-full w-90 h-90 object-cover mx-auto shadow-lg"
                        />
                        <div>
                            <h2 className="text-3xl font-bold text-black mb-6 border-l-4 border-indigo-600 pl-4">
                                Как започнах
                            </h2>
                            <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
                                <p className="whitespace-pre-line">
                                    Здравейте, казвам се {about?.name}.
                                </p>

                                <p className="whitespace-pre-line">
                                    {about?.description}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* row 2: Form + Contacts */}
                    <h2 className="text-3xl font-bold text-black mb-4 border-l-4 border-indigo-600 pl-4">Свържи се с мен</h2>
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Form */}
                        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Име <span className="text-red-500">*</span></label>
                                    <input type="text" name="firstName" className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500" placeholder="Име" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Фамилия <span className="text-red-500">*</span></label>
                                    <input type="text" name="lastName" className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500" placeholder="Фамилия" required />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Имейл <span className="text-red-500">*</span></label>
                                <input type="email" name="email" className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500" placeholder="example@example.com" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Телефон</label>
                                <PhoneInput
                                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500"
                                    name="telephone"
                                    value={phoneValue}
                                    onChange={setPhoneValue}
                                    placeholder="+359..."
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Тема</label>
                                <input type="text" name="theme" className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Запитване</label>
                                <textarea rows={5} name="message" className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500" required />
                            </div>
                            <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-indigo-700 transition">
                                Изпрати запитване
                            </button>
                        </form>

                        {/* Contacts */}

                        <div className="space-y-6">
                            {about?.showAddress === 'true' && (
                                <div className="p-4 border bg-white border-gray-200 rounded-md shadow-sm">
                                    <span className="text-indigo-600 font-semibold uppercase">Адрес</span>
                                    <p className="text-gray-700 mt-1">{about?.address}</p>
                                </div>
                            )}

                            <div className="p-4 border bg-white border-gray-200 rounded-md shadow-sm">
                                <span className="text-indigo-600 font-semibold uppercase">Телефон</span>
                                <a href={`tel:${about?.telephone}`}>
                                    <p className="text-gray-700 mt-1">{about?.telephone}</p>
                                </a>
                            </div>
                            <div className="p-4 border bg-white border-gray-200 rounded-md shadow-sm">
                                <span className="text-indigo-600 font-semibold uppercase">Имейл</span>
                                <a href={`mailto:${about?.email}`} >
                                    <p className="text-gray-700 mt-1">{about?.email}</p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
