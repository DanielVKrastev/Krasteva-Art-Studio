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

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [isLoading, setIsLoading] = useState(false);
    
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(orders.length / recordsPerPage);
    const startIndex = (currentPage - 1) * recordsPerPage;
    const currentOrders = orders.slice(startIndex, startIndex + recordsPerPage);

    const handlePagination = (page) => {
        setCurrentPage(page);
    };

    const setRecordsPerPagePaginationHandler = (e) => {
        setRecordsPerPage(e.target.value);
    };

    const [isOpenUpdate, setIsOpenUpdate] = useState(false);
    const [updateItem, setUpdateItem] = useState(null);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [deleteItem, setDeleteItem] = useState(null);

    useEffect(() => {
        const fetchInitial = async () => {
            setIsLoading(true);
            const data = await orderApi.getAll();
            setIsLoading(false);
            setOrders(data);
        };
        fetchInitial();
    }, [recordsPerPage, isOpenDelete, isOpenUpdate]);

    const deleteOrder = async (id) => {
        try{
            const order = await orderApi.getOne(id);
            await orderApi.deleteOrder(id);
            setOrders(state => state.filter(painting => painting.id !== id));
            if(order.deletehash){
                deleteImage(order.deletehash);
            }
        }catch(err){
            console.log(err);
        }
    };

    const openOrderUpdate = (id, name) => {
        setIsOpenUpdate(true);
        setUpdateItem({id, name});
    };
 
    const closeOrderUpdate = () => {
        setIsOpenUpdate(false);
        setUpdateItem(null);
    };

    const openOrderDelete = (id, name) => {
        setIsOpenDelete(true);
        setDeleteItem({id, name});
    };

    const closeDrawerDelete = () => {
        setIsOpenDelete(false);
        setDeleteItem(null);
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
                            <form className="sm:pr-3" action="#" method="GET">
                                <label htmlFor="products-search" className="sr-only">Търси</label>
                                <div className="relative w-48 mt-1 sm:w-64 xl:w-96">
                                    <input
                                        type="text"
                                        id="products-search"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                        placeholder="Търсене на поръчки"
                                    />
                                </div>
                            </form>

                            <div className="flex items-center w-full sm:justify-end mr-2">
                                <div className="flex pl-2 space-x-1">
                                    <TrashIcon onClick={() => console.log('click trash') } className="inline-flex items-center w-11 h-11 px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-300" />
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

            {(isOpenUpdate || isOpenDelete) && <div onClick={() => { closeOrderUpdate(); closeDrawerDelete(); }} className="bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-49"></div>}

        </>
    );
}