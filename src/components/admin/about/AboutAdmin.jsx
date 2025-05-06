import { TrashIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import Pagination from "../partials/pagination/Pagination";
import NavigationLinks from "../partials/navigation-links/NavigationLinks";
import DeleteDrawer from "../partials/delete-drawer/DeleteDrawer";
import TableAbout from "./table-about/TableAbout";
import UpdateAbout from "./update-about/UpdateAbout";
import CreateAbout from "./create-about/CreateAbout";
import deleteImage from "../../../utils/deleteImage";
import LoadingSpinner from "../../partials/loading-spinner/LoadingSpinner";
import aboutApi from "../../../api/aboutApi";
import MessageToast from "../../partials/message-toast/MessageToast";

export default function AboutAdmin() {
    const [about, setAbout] = useState([]);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [isLoading, setIsLoading] = useState(false);
    const [showMessageToast, setMessageShowToast] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(about.length / recordsPerPage);
    const startIndex = (currentPage - 1) * recordsPerPage;
    const currentPaintings = about.slice(startIndex, startIndex + recordsPerPage);

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
            await aboutApi.getAll()
                .then(result => {
                    setAbout(result);
                    setIsLoading(false);
                }).catch(err => {
                    setIsLoading(false);
                    console.error(err.message);
                });
            return;


        };
        fetchInitial();
    }, [recordsPerPage, isOpenDelete, isOpenCreate, isOpenUpdate]);

    const deletePainting = async (id) => {
        try {
            const about = await aboutApi.getOne(id);
            await aboutApi.deleteAbout(id);
            setAbout(state => state.filter(a => a.id !== id));
            if (about.deletehash) {
                deleteImage(about.deletehash);
            }
            setMessageShowToast({type: 'success', content: 'Успешно изтриване.'})
        } catch (err) {
            console.log(err);
            setMessageShowToast({type: 'error', content: 'Грешка в изтриването.'})
        }
    };

    const openAboutCreate = () => {
        setIsOpenCreate(true);
    };

    const closeAboutCreate = () => {
        setIsOpenCreate(false);
    };

    const openAboutUpdate = (id, name) => {
        setIsOpenUpdate(true);
        setUpdateItem({ id, name });
    };

    const closeAboutUpdate = () => {
        setIsOpenUpdate(false);
        setUpdateItem(null);
    };

    const openAboutDelete = (id, name) => {
        setIsOpenDelete(true);
        setDeleteItem({ id, name });
    };

    const closeAboutDelete = () => {
        setIsOpenDelete(false);
        setDeleteItem(null);
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
                            pageName={'За мен'}
                        />
                        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                            Страница за мен
                        </h1>
                    </div>

                    <div className="items-center justify-between block sm:flex">
                        <div className="flex items-center mb-4 sm:mb-0">

                            <button
                                className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
                                type="button"
                                onClick={openAboutCreate}
                            >
                                Добави за мен
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <TableAbout
                currentPaintings={currentPaintings}
                startIndex={startIndex}
                openDrawerUpdate={openAboutUpdate}
                openDrawerDelete={openAboutDelete}
            />

            <Pagination
                item={about}
                currentPage={currentPage}
                totalPages={totalPages}
                currentItem={currentPaintings}
                setRecordsPerPagePaginationHandler={setRecordsPerPagePaginationHandler}
                handlePagination={handlePagination}
            />

            <div>
                {/* Create ABOUT */}
                {isOpenCreate && <CreateAbout
                    setMessageShowToast={setMessageShowToast}
                    closeAboutCreate={closeAboutCreate}
                />
                }

                {/* UPDATE ABOUT */}
                {isOpenUpdate && <UpdateAbout
                    updateId={updateItem.id}
                    item={updateItem.name}
                    setMessageShowToast={setMessageShowToast}
                    closeAboutUpdate={closeAboutUpdate}
                />
                }

                {/* DELETE ABOUT */}
                {isOpenDelete && <DeleteDrawer
                    deleteId={deleteItem.id}
                    item={deleteItem.name}
                    closeDrawerDelete={closeAboutDelete}
                    handlerDelete={deletePainting}
                />
                }

            </div>

            {(isOpenUpdate || isOpenDelete || isOpenCreate) && <div onClick={() => { closeAboutUpdate(); closeAboutDelete(); closeAboutCreate(); }} className="bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-49"></div>}

        </>
    );
}