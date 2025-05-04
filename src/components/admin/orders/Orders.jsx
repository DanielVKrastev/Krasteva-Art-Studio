import { TrashIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import orderApi from "../../../api/orderApi";
import Pagination from "../partials/pagination/Pagination";
import NavigationLinks from "../partials/navigation-links/NavigationLinks";
import DeleteDrawer from "../partials/delete-drawer/DeleteDrawer";
import TableOrders from "./table-orders/TableOrders";
import UpdateOrder from "./update-order/UpdateOrder";
import deleteImage from "../../../utils/deleteImage";
import LoadingSpinner from "../../partials/loading-spinner/LoadingSpinner";
import paintingApi from "../../../api/paintingApi";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams, setSearchParams] = useState([]);
    const [selectedValueCriteria, setSelectedValueCriteria] = useState('telephone');

    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(orders.length / recordsPerPage);
    const startIndex = (currentPage - 1) * recordsPerPage;
    const currentOrders = orders.slice(startIndex, startIndex + recordsPerPage);

    const handlePagination = (page) => {
        setCurrentPage(page);
    };

    const setRecordsPerPagePaginationHandler = (e) => {
        setRecordsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages || 1);
        }
    }, [totalPages, currentPage]);

    const [isOpenUpdate, setIsOpenUpdate] = useState(false);
    const [updateItem, setUpdateItem] = useState(null);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [deleteItem, setDeleteItem] = useState(null);

    useEffect(() => {
        const fetchInitial = async () => {
            setIsLoading(true);
            if (!searchParams.search) {
                await orderApi.getAll()
                    .then(result => {
                        setOrders(result);
                        setIsLoading(false);
                    }).catch(err => {
                        setIsLoading(false);
                        console.error(err.message);
                    });
                return;
            }

            await orderApi.getAll()
                .then(result => {
                    const search = searchParams.search;
                    const criteria = searchParams.criteria;

                    const searchFind = result.filter(order =>
                        order[criteria]?.toLowerCase().includes(search.toLowerCase())
                    );
                    setOrders(searchFind);
                    setIsLoading(false);
                }).catch(err => {
                    setIsLoading(false);
                    console.error(err);
                });
            return;
        };

        fetchInitial();
    }, [recordsPerPage, isOpenDelete, isOpenUpdate, searchParams]);

    const deleteOrder = async (id) => {
        try {
            const order = await orderApi.getOne(id);
            await paintingApi.markForSell(order.paintingIds);
            await orderApi.deleteOrder(id);
            setOrders(state => state.filter(order => order.id !== id));
            if (order.deletehash) {
                deleteImage(order.deletehash);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const openOrderUpdate = (id, name) => {
        setIsOpenUpdate(true);
        setUpdateItem({ id, name });
    };

    const closeOrderUpdate = () => {
        setIsOpenUpdate(false);
        setUpdateItem(null);
    };

    const openOrderDelete = (id, name) => {
        setIsOpenDelete(true);
        setDeleteItem({ id, name });
    };

    const closeDrawerDelete = () => {
        setIsOpenDelete(false);
        setDeleteItem(null);
    };

    const handleChangeSelectCriteria = (e) => {
        setSelectedValueCriteria(e.target.value);
    };

    const searchClickHandler = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const search = formData.get('search');
        const criteria = formData.get('criteria');

        setSearchParams({ search, criteria });
    };

    return (
        <>
            {isLoading && <LoadingSpinner />}
            <div className="p-6 bg-white text-gray-900 sm:ml-55 block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5">
                <div className="mt-14">
                    <div className="mb-4">
                        <NavigationLinks
                            pageName={'Поръчки'}
                        />
                        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                            Поръчки
                        </h1>
                    </div>

                    <div className="items-center justify-between block sm:flex">
                        <div className="flex items-center mb-4 sm:mb-0">
                            <form className="w-100 mx-auto" onSubmit={searchClickHandler}>
                                <div className="flex">
                                    <select
                                        className="shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 :bg-gray-700"
                                        name="criteria"
                                        value={selectedValueCriteria}
                                        onChange={handleChangeSelectCriteria}
                                    >
                                        <option value='firstName'>Име</option>
                                        <option value='lastName'>Фамилия</option>
                                        <option value='email'>Email</option>
                                        <option value='telephone'>Телефон</option>
                                        <option value='psotCode'>Пощ. код</option>
                                        <option value='town'>Град</option>
                                        <option value='status'>Статус</option>
                                    </select>
                                    <div className="relative w-full">
                                        <input
                                            type="search"
                                            name="search"
                                            className="block p-3 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Име, Email, Телефон..."
                                        />
                                        <button
                                            type="submit"
                                            className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                                        >
                                            <svg
                                                className="w-4 h-4"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                                />
                                            </svg>
                                            <span className="sr-only">Търсене</span>
                                        </button>
                                    </div>
                                </div>
                            </form>


                            <div className="flex items-center sm:justify-end mr-2">
                                <div className="flex pl-2 space-x-1">
                                    <TrashIcon onClick={() => console.log('click trash')} className="inline-flex items-center w-11 h-11 px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-300" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <TableOrders
                currentOrders={currentOrders}
                startIndex={startIndex}
                openOrderUpdate={openOrderUpdate}
                openOrderDelete={openOrderDelete}
            />

            <Pagination
                item={orders}
                currentPage={currentPage}
                totalPages={totalPages}
                currentItem={currentOrders}
                setRecordsPerPagePaginationHandler={setRecordsPerPagePaginationHandler}
                handlePagination={handlePagination}
            />

            <div>

                {/* UPDATE ORDER */}
                {isOpenUpdate && <UpdateOrder
                    updateId={updateItem.id}
                    item={updateItem.name}
                    closeOrderUpdate={closeOrderUpdate}
                />
                }

                {/* DELETE ORDER */}
                {isOpenDelete && <DeleteDrawer
                    deleteId={deleteItem.id}
                    item={deleteItem.name}
                    closeDrawerDelete={closeDrawerDelete}
                    handlerDelete={deleteOrder}
                />
                }

            </div>

            {(isOpenUpdate || isOpenDelete) && <div onClick={() => { closeOrderUpdate(); closeDrawerDelete(); }} className="bg-gray-900/50 fixed inset-0 z-49"></div>}

        </>
    );
}