import { TrashIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import paintingApi from "../../../api/paintingApi";
import Pagination from "../partials/pagination/Pagination";
import NavigationLinks from "../partials/navigation-links/NavigationLinks";
import DeleteDrawer from "../partials/delete-drawer/DeleteDrawer";
import TablePaintings from "./table-paintings/TablePaintings";
import UpdateDrawer from "./update-drawer/UpdateDrawer";
import CreateDrawer from "./create-drawer/CreateDrawer";
import deleteImage from "../../../utils/deleteImage";
import LoadingSpinner from "../../partials/loading-spinner/LoadingSpinner";
import MessageToast from "../../partials/message-toast/MessageToast";

export default function Paintings() {
    const [paintings, setPaintings] = useState([]);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams, setSearchParams] = useState([]);
    const [selectedValueCriteria, setSelectedValueCriteria] = useState('name');
    const [showMessageToast, setMessageShowToast] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(paintings.length / recordsPerPage);
    const startIndex = (currentPage - 1) * recordsPerPage;
    const currentPaintings = paintings.slice(startIndex, startIndex + recordsPerPage);

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

    const [isOpenCreate, setIsOpenCreate] = useState(false);
    const [isOpenUpdate, setIsOpenUpdate] = useState(false);
    const [updateItem, setUpdateItem] = useState(null);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [deleteItem, setDeleteItem] = useState(null);

    useEffect(() => {
        const fetchInitial = async () => {
            setIsLoading(true);
            if (!searchParams.search) {
                await paintingApi.getAll()
                    .then(result => {
                        setPaintings(result);
                        setIsLoading(false);
                    }).catch(err => {
                        setIsLoading(false);
                        console.error(err.message);
                    });
                return;
            }

            await paintingApi.getAll()
                .then(result => {
                    const search = searchParams.search;
                    const criteria = searchParams.criteria;

                    const searchFind = result.filter(painting =>
                        painting[criteria]?.toLowerCase().includes(search.toLowerCase())
                    );
                    setPaintings(searchFind);
                    setIsLoading(false);
                }).catch(err => {
                    setIsLoading(false);
                    console.error(err);
                });
            return;
        };
        fetchInitial();
    }, [recordsPerPage, isOpenDelete, isOpenCreate, isOpenUpdate, searchParams]);

    const deletePainting = async (id) => {
        try {
            const painting = await paintingApi.getOne(id);
            await paintingApi.deletePainting(id);
            setPaintings(state => state.filter(painting => painting.id !== id));
            if (painting.deletehash) {
                deleteImage(painting.deletehash);
            }
            setMessageShowToast({type: 'success', content: 'Успешно изтриване.'});
        } catch (err) {
            console.log(err);
            setMessageShowToast({type: 'error', content: 'Грешка в изтриването.'});
        }
    };

    const openDrawerCreate = () => {
        setIsOpenCreate(true);
    };

    const closeDrawerCreate = () => {
        setIsOpenCreate(false);
    };

    const openDrawerUpdate = (id, name) => {
        setIsOpenUpdate(true);
        setUpdateItem({ id, name });
    };

    const closeDrawerUpdate = () => {
        setIsOpenUpdate(false);
        setUpdateItem(null);
    };

    const openDrawerDelete = (id, name) => {
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

            {showMessageToast && <MessageToast
                message={showMessageToast}
                onClose={setMessageShowToast}
            />}

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
                            <form className="w-100 mx-auto" onSubmit={searchClickHandler}>
                                <div className="flex">
                                    <select
                                        className="shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 :bg-gray-700"
                                        name="criteria"
                                        value={selectedValueCriteria}
                                        onChange={handleChangeSelectCriteria}
                                    >
                                        <option value='name'>Име</option>
                                        <option value='category'>Категория</option>
                                        <option value='size'>Размери</option>
                                        <option value='paints'>Бои</option>
                                        <option value='sold'>Продадена</option>
                                        <option value='active'>Активна</option>
                                    </select>
                                    <div className="relative w-full">
                                        <input
                                            type="search"
                                            name="search"
                                            className="block p-3 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Име, Категория, Размери..."
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


                            <button
                                className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
                                type="button"
                                onClick={openDrawerCreate}
                            >
                                Добави картина
                            </button>
                        </div>
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
                item={paintings}
                currentPage={currentPage}
                totalPages={totalPages}
                currentItem={currentPaintings}
                setRecordsPerPagePaginationHandler={setRecordsPerPagePaginationHandler}
                handlePagination={handlePagination}
            />

            <div>
                {/* Create DRAWER */}
                {isOpenCreate && <CreateDrawer
                    setMessageShowToast={setMessageShowToast}
                    closeDrawerCreate={closeDrawerCreate}
                />
                }

                {/* UPDATE DRAWER */}
                {isOpenUpdate && <UpdateDrawer
                    updateId={updateItem.id}
                    item={updateItem.name}
                    setMessageShowToast={setMessageShowToast}
                    closeDrawerUpdate={closeDrawerUpdate}
                />
                }

                {/* DELETE DRAWER */}
                {isOpenDelete && <DeleteDrawer
                    deleteId={deleteItem.id}
                    item={deleteItem.name}
                    closeDrawerDelete={closeDrawerDelete}
                    handlerDelete={deletePainting}
                />
                }

            </div>

            {(isOpenUpdate || isOpenDelete || isOpenCreate) && <div onClick={() => { closeDrawerUpdate(); closeDrawerDelete(); closeDrawerCreate(); }} className="bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-49"></div>}

        </>
    );
}