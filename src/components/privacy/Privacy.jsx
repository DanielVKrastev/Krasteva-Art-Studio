import { Link } from "react-router-dom";
import LegalFooterNote from "../partials/legal-footer-note/LegalFooterNote";

export default function Privacy() {
    return (
        <div className="bg-gray-100 py-16 px-6 sm:px-16 lg:px-20">
            <div className="container mx-auto px-4 space-y-16">

                {/* Breadcrumb */}
                <div className="mb-4 text-sm text-gray-500">
                    <Link to="/" className="text-indigo-600 hover:underline">Начало</Link>
                    <span className="mx-2">/</span>
                    <span className="text-black font-semibold">Политика за поверителност</span>
                </div>

                {/* Content */}
                <div className="bg-white p-6 rounded-lg shadow-md space-y-6 text-gray-700 leading-relaxed text-lg">
                    {/* Title */}
                    <h1 className="text-3xl font-bold text-black border-l-4 border-indigo-600 pl-4">
                        Политика за поверителност
                    </h1>
                    <p>
                        Настоящата политика за поверителност описва как събираме, използваме и съхраняваме лични данни, предоставени от Вас при използване на сайта <strong>Krasteva Art Studio</strong>.
                    </p>

                    <h2 className="text-xl font-semibold text-black">1. Какви лични данни събираме?</h2>
                    <ul className="list-disc ml-6 space-y-1">
                        <li>Име и фамилия</li>
                        <li>Имейл адрес</li>
                        <li>Телефонен номер</li>
                        <li>Адрес за доставка</li>
                        <li>Съобщения, изпратени чрез контактната форма</li>
                    </ul>

                    <h2 className="text-xl font-semibold text-black">2. За какво използваме Вашите данни?</h2>
                    <p>Събраните данни се използват с цел:</p>
                    <ul className="list-disc ml-6 space-y-1">
                        <li>Изпълнение на поръчки</li>
                        <li>Изпращане на потвърждения и информация за доставка</li>
                        <li>Отговор на запитвания чрез контактната форма</li>
                        <li>Подобряване на нашите услуги и преживяване в сайта</li>
                    </ul>

                    <h2 className="text-xl font-semibold text-black">3. Съхранение и сигурност на данните</h2>
                    <p>Вашите данни се съхраняват в защитена среда в <strong>Firebase</strong> и няма да бъдат предоставяни на трети страни без Ваше изрично съгласие, освен ако това не се изисква по закон.</p>

{/*
                    <h2 className="text-xl font-semibold text-black">4. Бисквитки (Cookies)</h2>
                    <p>Сайтът използва бисквитки с цел подобряване на функционалността и потребителското преживяване. Можете да управлявате настройките на бисквитките от Вашия браузър.</p>
*/}
                    <h2 className="text-xl font-semibold text-black">4. Вашите права</h2>
                    <p>Имате право на:</p>
                    <ul className="list-disc ml-6 space-y-1">
                        <li>Достъп до личните Ви данни</li>
                        <li>Коригиране или изтриване на данни</li>
                        <li>Оттегляне на съгласието за обработка</li>
                    </ul>

                    <h2 className="text-xl font-semibold text-black">5. Контакти</h2>
                    <p>При въпроси относно политиката за поверителност можете да се свържете с нас чрез <Link to='/about' className="text-indigo-600">формата за контакт или на имейл.</Link></p>
                </div>

                <LegalFooterNote date="09 юли 2025 г." />
            </div>
        </div>
    );
}
