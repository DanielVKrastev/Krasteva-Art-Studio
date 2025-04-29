import { Cog6ToothIcon, TrashIcon } from "@heroicons/react/16/solid";
import dateConvertor from "../../../../utils/dateConvertor";
import PaintingListCell from "./painting-list-cell/PaintingListCell";
import paintingApi from "../../../../api/paintingApi";

export default function TableOrders({
    currentOrders,
    startIndex,
    openOrderUpdate,
    openOrderDelete
}) {
    return (
        <div className="flex flex-col sm:ml-55">
            <div className="overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden shadow">
                        <table className="min-w-full divide-y divide-gray-200 table-fixed">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th scope="col" className="p-6">
                                        <input
                                            id="checkbox-all"
                                            type="checkbox"
                                            className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </th>
                                    {["Име / ID", "Email", "Телефон", "Картини", "Дата", "Адрес", "Пощ. код", "Цена", "Статус", "Действия"].map((title) => (
                                        <th
                                            key={title}
                                            className="p-6 text-xs font-medium text-left text-gray-500 uppercase"
                                        >
                                            {title}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {currentOrders.map((order, index) => (
                                    <tr key={order.id} className="hover:bg-gray-50">
                                        <td className="w-4 p-6">
                                            <input
                                                id={`checkbox-${order.id}`}
                                                type="checkbox"
                                                className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-2 focus:ring-indigo-500"
                                            />
                                        </td>
                                        <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap">
                                            <div className="text-base font-semibold text-gray-900">{order.firstName} {order.lastName}</div>
                                            <div className="text-sm font-normal text-gray-500">{startIndex + index + 1}</div>
                                        </td>
                                        <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap">
                                            {order.email}
                                        </td>
                                        <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs">
                                            {order.telephone}
                                        </td>

                                        <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap">
                                            {order.paintingIds?.map(paintingId => (
                                                <PaintingListCell key={paintingId} paintingId={paintingId} />
                                            ))}
                                        </td>
                                        <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap">
                                            {dateConvertor(order.createdAt)}
                                        </td>
                                        <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap">
                                            гр./с. {order.town} / {order.address}
                                        </td>
                                        <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap">
                                            {order.postCode}
                                        </td>
                                        <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap">
                                            {order.totalPrice}
                                        </td>
                                        <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap">
                                            {order.status}
                                        </td>
                                        <td className="p-4 space-x-2 whitespace-nowrap">
                                            <Cog6ToothIcon onClick={() => openOrderUpdate(order.id, startIndex + index + 1)} className="inline-flex items-center w-11 h-11 px-3 py-2 text-white bg-indigo-700 rounded-lg hover:bg-indigo-800 focus:ring-2 focus:ring-indigo-300" />

                                            <TrashIcon onClick={() => openOrderDelete(order.id, startIndex + index + 1)} className="inline-flex items-center w-11 h-11 px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-300" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}