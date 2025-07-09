import { Link } from "react-router-dom";
import LegalFooterNote from "../partials/legal-footer-note/LegalFooterNote";

export default function DeliveryPolicy() {
    return (
        <div className="bg-gray-100 py-16 px-6 sm:px-16 lg:px-20">
            <div className="container mx-auto px-4 space-y-16">

                {/* Breadcrumb */}
                <div className="mb-4 text-sm text-gray-500">
                    <Link to="/" className="text-indigo-600 hover:underline">Начало</Link>
                    <span className="mx-2">/</span>
                    <span className="text-black font-semibold">Политика за доставка</span>
                </div>

                {/* Content */}
                <div className="bg-white p-6 rounded-lg shadow-md space-y-6 text-gray-700 leading-relaxed text-lg">
                    {/* Title */}
                    <h1 className="text-3xl font-bold text-black border-l-4 border-indigo-600 pl-4">
                        Политика за доставка
                    </h1>

                    <h2 className="text-xl font-semibold text-black">1. Безплатна доставка</h2>
                    <p>
                        За всички поръчки предлагаме <strong>безплатна доставка</strong> до адрес или офис
                        на куриер (Еконт или Спиди) на територията на България.
                    </p>

                    <h2 className="text-xl font-semibold text-black">2. Срок за обработка</h2>
                    <p>
                        Вашата поръчка се обработва в рамките на <strong>1–3 работни дни</strong> след потвърждение.
                        При наличие на удължено време (например рамкиране), ще бъдете уведомени по имейл или телефон.
                    </p>

                    <h2 className="text-xl font-semibold text-black">3. Срок за доставка</h2>
                    <p>
                        След изпращане, доставката обикновено отнема <strong>1–2 работни дни</strong> в България.
                        За международни поръчки срокът е <strong>5–10 работни дни</strong> според дестинацията.
                    </p>

                    <h2 className="text-xl font-semibold text-black">4. Проследяване</h2>
                    <p>
                        При изпращане ще получите e‑mail/SMS с <strong>номер за проследяване</strong>.
                        Можете да следите пратката в реално време на сайта на избрания куриер.
                    </p>

                    <h2 className="text-xl font-semibold text-black">5. Преглед при получаване</h2>
                    <p>
                        Имате право да <strong>прегледате пратката пред куриера</strong>.
                        Ако забележите повреда, изискайте протокол за щета и се свържете с нас в
                        рамките на 24 ч. на <a href="mailto:krasteva.art.studio@gmail.com" className="text-indigo-600 hover:underline">krasteva.art.studio@gmail.com</a>.
                    </p>

                    <h2 className="text-xl font-semibold text-black">6. Международни доставки</h2>
                    <p>
                        Извършваме доставки в рамките на ЕС и избрани международни дестинации.
                        Таксата се изчислява индивидуално според размерите и адреса за доставка.
                    </p>

                    <h2 className="text-xl font-semibold text-black">7. Отказ и връщане</h2>
                    <p>
                        При отказ в 14‑дневен срок разходите за връщане са за сметка на клиента,
                        освен ако причината е дефект при транспорт.
                    </p>
                </div>

                <LegalFooterNote date="09 юли 2025 г." />
            </div>
        </div>
    );
}
