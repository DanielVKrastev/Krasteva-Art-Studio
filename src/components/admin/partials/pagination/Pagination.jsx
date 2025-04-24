import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/16/solid";

export default function Pagination({
    item,
    currentPage,
    totalPages,
    currentItem,
    setRecordsPerPagePaginationHandler,
    handlePagination
}) {
    return (
        <div className="sm:ml-55 sticky bottom-0 right-0 p-6 bg-white border-t border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                {/* Counter + arrows */}
                <div className="flex items-center space-x-2">
                    <span className="text-sm font-normal text-gray-500">Резултати на страница:</span>
                    <select name="limit" className="limit" defaultValue="10" onChange={setRecordsPerPagePaginationHandler}>
                        <option defaultValue="3">3</option>
                        <option defaultValue="5">5</option>
                        <option defaultValue="10">10</option>
                        <option defaultValue="15">15</option>
                        <option defaultValue="20">20</option>
                    </select>

                    <span className="text-sm font-normal text-gray-500">
                        Показани <span className="font-semibold text-gray-900">1–{currentItem.length}</span> от{' '}
                        <span className="font-semibold text-gray-900">{item.length}</span>
                    </span>
                </div>

                {/* Prev / Next бутони */}
                <div className="flex items-center space-x-3 justify-start sm:justify-end">
                    <div className="mt-4 flex justify-center space-x-1">
                        <button
                            onClick={() => handlePagination(1)}
                            disabled={currentPage === 1}
                            className="px-3 py-2 bg-indigo-400 text-white rounded-md disabled:bg-gray-400"
                        >
                            <ChevronDoubleLeftIcon className="w-6 h-6" />
                        </button>

                        <button
                            onClick={() => handlePagination(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-3 py-2 bg-indigo-400 text-white rounded-md disabled:bg-gray-400"
                        >
                            Назад
                        </button>

                        <span className="px-4 py-2 font-medium text-gray-700">
                            {currentPage} {totalPages ? `/ ${totalPages}` : ""}
                        </span>

                        <button
                            onClick={() => handlePagination(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-3 py-2 bg-indigo-400 text-white rounded-md disabled:bg-gray-400"
                        >
                            Напред
                        </button>

                        <button
                            onClick={() => handlePagination(totalPages)}
                            disabled={currentPage === totalPages}
                            className="px-3 py-2 bg-indigo-400 text-white rounded-md disabled:bg-gray-400"
                        >
                            <ChevronDoubleRightIcon className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}