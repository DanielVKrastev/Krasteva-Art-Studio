import dateConvertor from "../../../../utils/dateConvertor";
import PaintingListCell from "../../partials/painting-list-cell/PaintingListCell";

export default function TableOrdersDash({
    currentOrders,
    startIndex,
}) {
    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden shadow">
                        <table className="min-w-full divide-y divide-gray-200 table-fixed">
                            <thead className="bg-gray-100">
                                <tr>
                                    {["Име / ID", "Email", "Телефон", "Картини", "Дата", "Адрес", "Пощ. код", "Цена", "Статус"].map((title) => (
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
                                            <span className={`px-3 py-1 text-sm font-semibold rounded-full
                                                ${order.status === 'изчакване' ? 'bg-yellow-100 text-yellow-800' :
                                                    order.status === 'изпратена' ? 'bg-blue-100 text-blue-800' :
                                                        order.status === 'доставена' ? 'bg-green-100 text-green-800' :
                                                            order.status === 'отказана' ? 'bg-red-100 text-red-800' :
                                                                order.status === 'върната' ? 'bg-gray-100 text-gray-800' :
                                                                    'bg-gray-50 text-gray-500'
                                                }
                                            `}>
                                                {order.status}
                                            </span>

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