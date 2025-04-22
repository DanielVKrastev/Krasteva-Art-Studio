import { TrashIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import paintingApi from "../../../api/paintingApi";
import Pagination from "../partials/pagination/Pagination";
import NavigationLinks from "../partials/navigation-links/NavigationLinks";
import DeleteDrawer from "../partials/delete-drawer/DeleteDrawer";
import TablePaintings from "./table-paintings/TablePaintings";
import UpdateDrawer from "./update-drawer/UpdateDrawer";

export default function Paintings() {
    const [paintings, setPaintings] = useState([]);
    const [recordsPerPage, setRecordsPerPage] = useState(3);

    useEffect(() => {
        const fetchInitial = async () => {
            const data = await paintingApi.getAll();
            setPaintings(data);
        };
        fetchInitial();
    }, [recordsPerPage]);

    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(paintings.length / recordsPerPage);
    const startIndex = (currentPage - 1) * recordsPerPage;
    const currentPaintings = paintings.slice(startIndex, startIndex + recordsPerPage);

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

    const openDrawerUpdate = (id, name) => {
        setIsOpenUpdate(true);
        setUpdateItem({id, name});
    };

    const closeDrawerUpdate = () => {
        setIsOpenUpdate(false);
        setUpdateItem(null);
    };

    const openDrawerDelete = (id, name) => {
        setIsOpenDelete(true);
        setDeleteItem({id, name});
    };

    const closeDrawerDelete = () => {
        setIsOpenDelete(false);
        setDeleteId(null);
    };

    return (
        <>
            <div className="p-6 bg-white text-gray-900 sm:ml-55 block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5">
                <div className="mt-14">
                    <div className="mb-4">
                        <NavigationLinks
                            pageName={'Картини'}
                        />
                        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                            Всички картини
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
                                        placeholder="Search for products"
                                    />
                                </div>
                            </form>

                            <div className="flex items-center w-full sm:justify-end mr-2">
                                <div className="flex pl-2 space-x-1">
                                    <TrashIcon onClick={openDrawerDelete} className="inline-flex items-center w-11 h-11 px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-300" />
                                </div>
                            </div>
                        </div>

                        <button
                            className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
                            type="button"
                        >
                            Добави картина
                        </button>
                    </div>
                </div>
            </div>

            <TablePaintings
                currentPaintings={currentPaintings}
                startIndex={startIndex}
                openDrawerUpdate={openDrawerUpdate}
                openDrawerDelete={openDrawerDelete}
            />

            <Pagination
                paintings={paintings}
                currentPage={currentPage}
                totalPages={totalPages}
                currentPaintings={currentPaintings}
                setRecordsPerPagePaginationHandler={setRecordsPerPagePaginationHandler}
                handlePagination={handlePagination}
            />

            <div>
                {/* UPDATE DRAWER */}
                {isOpenUpdate && <UpdateDrawer
                    updateId={updateItem.id}
                    item={updateItem.name}
                    closeDrawerUpdate={closeDrawerUpdate}
                />
                }

                {/* DELETE DRAWER */}
                {isOpenDelete && <DeleteDrawer
                    deleteId={deleteItem.id}
                    item={deleteItem.name}
                    closeDrawerDelete={closeDrawerDelete}
                />
                }

            </div>

            {(isOpenUpdate || isOpenDelete) && <div onClick={() => { closeDrawerUpdate(); closeDrawerDelete() }} className="bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-49"></div>}

        </>
    );
}