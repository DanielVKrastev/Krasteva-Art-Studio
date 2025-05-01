import { useEffect, useState } from "react";
import TableOrdersDash from "./table-orders-dash/TableOrdersDash";
import orderApi from "../../../api/orderApi";
import paintingApi from "../../../api/paintingApi";
import availabilityInquiryApi from "../../../api/availabilityInquiryApi";
import contactMessageApi from "../../../api/contactMessageApi";
import { Link } from "react-router-dom";

export default function Dashboard() {
    const [orders, setOrders] = useState([]);
    const [totalPainting, setTotalPainting] = useState(0);
    const [totalInquiry, setTotalInquiry] = useState(0);
    const [totalMessages, setTotalMessages] = useState(0);
    const [profitData, setProfitData] = useState({});

    useEffect(() => {
        const fetchInitial = async () => {
            const data = await orderApi.getLimit(8);
            const profitData = await orderApi.getProfitData();
            const totalPainting = await paintingApi.getPaintingsCount();
            const totalInquiry = await availabilityInquiryApi.getInquiryCount();
            const totalMessages = await contactMessageApi.getMessagesCount();
            setTotalPainting(totalPainting);
            setTotalInquiry(totalInquiry);
            setTotalMessages(totalMessages);
            setProfitData(profitData);
            setOrders(data);
        };
        fetchInitial();
    }, []);

    return (
        <>
            <div className="p-4 sm:ml-64">
                <div className="p-4 border-dashed rounded-lg mt-14">
                    <div className="grid w-full grid-cols-1 gap-4 mt-4 xl:grid-cols-2 2xl:grid-cols-3">
                        <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex">
                            <div className="w-full">
                                <h3 className="text-base font-normal text-gray-500">
                                    Печалба този месец
                                </h3>
                                <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl">
                                    {profitData.currentMonthProfit}лв
                                </span>
                                <p className="flex items-center text-base font-normal text-gray-500">
                                    <span className="flex items-center mr-1.5 text-sm text-green-500">
                                        <svg
                                            className="w-4 h-4"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                            aria-hidden="true"
                                        >
                                            <path
                                                clipRule="evenodd"
                                                fillRule="evenodd"
                                                d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
                                            />
                                        </svg>
                                        {profitData.currentMonthProfit - profitData.lastMonthProfit}лв
                                    </span>
                                    От миналия месец
                                </p>
                            </div>
                            <div className="w-full" id="new-products-chart" />
                        </div>

                        <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex">
                            <div className="w-full">
                                <h3 className="text-base font-normal text-gray-500">
                                    Обща печалба
                                </h3>
                                <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl">
                                    {profitData.totalProfit}лв
                                </span>
                                <p className="flex items-center text-base font-normal text-gray-500">
                                    За целия период
                                </p>
                            </div>
                            <div className="w-full" id="new-products-chart" />
                        </div>

                        <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex">
                            <div className="w-full">
                                <h3 className="text-base font-normal text-gray-500">
                                    Общо поръчки
                                </h3>
                                <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl">
                                    {profitData.totalOrders}
                                </span>
                                <Link to='/admin/orders'><p className="flex items-center text-base font-normal text-gray-500">
                                    За целия период
                                </p>
                                </Link>
                            </div>
                            <div className="w-full" id="new-products-chart" />
                        </div>

                        <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex">
                            <div className="w-full">
                                <h3 className="text-base font-normal text-gray-500">
                                    Поръчки този месец
                                </h3>
                                <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl">
                                    {profitData.currentMonthOrders}
                                </span>
                                <p className="flex items-center text-base font-normal text-gray-500">
                                    <span className="flex items-center mr-1.5 text-sm text-green-500">
                                        <svg
                                            className="w-4 h-4"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                            aria-hidden="true"
                                        >
                                            <path
                                                clipRule="evenodd"
                                                fillRule="evenodd"
                                                d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
                                            />
                                        </svg>
                                        {profitData.currentMonthOrders - profitData.lastMonthOrders}
                                    </span>
                                    От миналия месец
                                </p>
                            </div>
                            <div className="w-full" id="new-products-chart" />
                        </div>

                        <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex">
                            <div className="w-full">
                                <h3 className="text-base font-normal text-gray-500">
                                    Картини
                                </h3>
                                <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl">
                                    {totalPainting}
                                </span>
                                <Link to='/admin/paintings'><p className="flex items-center text-base font-normal text-gray-500">
                                    Виж
                                </p>
                                </Link>
                            </div>
                            <div className="w-full" id="new-products-chart" />
                        </div>
                        <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex">
                            <div className="w-full">
                                <h3 className="text-base font-normal text-gray-500">
                                    Запитвания
                                </h3>
                                <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl">
                                    {totalInquiry}
                                </span>
                                <Link to='/admin/inquiry'><p className="flex items-center text-base font-normal text-gray-500">
                                    Виж нови
                                </p>
                                </Link>
                            </div>
                            <div className="w-full" id="new-products-chart" />
                        </div>
                        <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex">
                            <div className="w-full">
                                <h3 className="text-base font-normal text-gray-500">
                                    Съобщения
                                </h3>
                                <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl">
                                    {totalMessages}
                                </span>
                                <Link to='/admin/contact-messages'><p className="flex items-center text-base font-normal text-gray-500">
                                    Виж нови
                                </p>
                                </Link>
                            </div>
                            <div className="w-full" id="new-products-chart" />
                        </div>
                    </div>

                    <div className="grid w-full grid-cols-1 gap-4 mt-4 xl:grid-cols-1 2xl:grid-cols-1">
                        <div className="items-center justify-center h-48 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                            <TableOrdersDash
                                currentOrders={orders}
                                startIndex={0}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}