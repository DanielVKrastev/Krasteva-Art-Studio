import { Cog6ToothIcon, TrashIcon } from "@heroicons/react/16/solid";

export default function TableAbout({
    currentPaintings,
    startIndex,
    openDrawerUpdate,
    openDrawerDelete
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
                                    {["Име / ID", "E-mail", "Телефон", "Адрес" ,"Описание", "Снимка", "Действия"].map((title) => (
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
                                {currentPaintings.map((about, index) => (
                                    <tr key={about.id} className="hover:bg-gray-50">
                                        <td className="w-4 p-6">
                                            <input
                                                id={`checkbox-${about.id}`}
                                                type="checkbox"
                                                className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-2 focus:ring-indigo-500"
                                            />
                                        </td>
                                        <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap">
                                            <div className="text-base font-semibold text-gray-900">{about.name}</div>
                                            <div className="text-sm font-normal text-gray-500">{startIndex + index + 1}</div>
                                        </td>
                                        <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap">
                                            {about.email}
                                        </td>
                                        <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap">
                                            {about.telephone}
                                        </td>
                                        <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap">
                                            {about.address}
                                        </td>
                                        <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap">
                                            {about.description?.slice(0, 50)}...
                                        </td>
                                        
                                        <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap">
                                            <img src={about?.imageUrl} alt={about.name} className="w-20" />
                                        </td>
                                        <td className="p-4 space-x-2 whitespace-nowrap">
                                            <Cog6ToothIcon onClick={() => openDrawerUpdate(about.id, about.name)} className="inline-flex items-center w-11 h-11 px-3 py-2 text-white bg-indigo-700 rounded-lg hover:bg-indigo-800 focus:ring-2 focus:ring-indigo-300" />

                                            <TrashIcon onClick={() => openDrawerDelete(about.id, about.name)} className="inline-flex items-center w-11 h-11 px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-300" />
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