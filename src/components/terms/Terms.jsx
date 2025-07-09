import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingSpinner from "../partials/loading-spinner/LoadingSpinner";
import aboutApi from "../../api/aboutApi";
import LegalFooterNote from "../partials/legal-footer-note/LegalFooterNote";

export default function Terms() {
    const [about, setAbout] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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

    return (
        <>
            {isLoading && <LoadingSpinner />}

            <div className="bg-gray-100 py-16 px-6 sm:px-16 lg:px-20">
                <div className="container mx-auto px-4 space-y-16">

                    {/* Breadcrumb */}
                    <div className="mb-4 text-sm text-gray-500">
                        <Link to="/" className="text-indigo-600 hover:underline">Начало</Link>
                        <span className="mx-2">/</span>
                        <span className="text-black font-semibold">Общи условия</span>
                    </div>

                    {/* Main content */}
                    <div className="bg-white p-6 rounded-lg shadow-md space-y-6 text-gray-700 text-lg leading-relaxed">
                        <h2 className="text-3xl font-bold text-black mb-6 border-l-4 border-indigo-600 pl-4">
                            Общи условия за ползване на сайта
                        </h2>

                        <p>
                            Настоящите общи условия уреждат отношенията между вас като потребител и "Krasteva Art Studio" при използване на този уебсайт и закупуване на продукти през него.
                        </p>

                        <h3 className="text-xl font-semibold mt-6">1. Идентификация</h3>
                        <p>
                            Собственик на сайта: {about?.name}
                            <br />
                            Имейл за връзка: {about?.email}
                            <br />
                            Телефон: {about?.telephone}
                        </p>

                        <h3 className="text-xl font-semibold mt-6">2. Поръчки и доставка</h3>
                        <p>
                            Всички поръчки се обработват в рамките на 1–3 работни дни. Доставката е безплатна за всички поръчки на територията на България.
                        </p>

                        <h3 className="text-xl font-semibold mt-6">3. Връщане и отказ</h3>
                        <p>
                            Имате право да върнете закупена картина в срок от 14 дни от получаването, при условие че тя не е повредена. Разходите за връщане са за сметка на клиента.
                        </p>

                        <h3 className="text-xl font-semibold mt-6">4. Цени и плащания</h3>
                        <p>
                            Всички цени са в български лева (лв.) с включено ДДС. Плащанията се извършват чрез наложен платеж при доставка или по банков път.
                        </p>

                        <h3 className="text-xl font-semibold mt-6">5. Защита на лични данни</h3>
                        <p>
                            Всички лични данни, които предоставяте чрез този сайт, се обработват съгласно Регламент (ЕС) 2016/679 (GDPR). Повече информация ще намерите в нашата Политика за поверителност.
                        </p>

                        <h3 className="text-xl font-semibold mt-6">6. Авторски права</h3>
                        <p>
                            Всички изображения и текстове на сайта са обект на авторско право и не могат да бъдат използвани без писмено съгласие.
                        </p>

                        <h3 className="text-xl font-semibold mt-6">7. Промени в условията</h3>
                        <p>
                            Сайтът си запазва правото да променя настоящите условия без предизвестие. Актуализираната версия ще бъде публикувана на тази страница.
                        </p>
                        <LegalFooterNote date="09 юли 2025 г." />
                    </div>

                </div>
            </div>
        </>
    );
}
