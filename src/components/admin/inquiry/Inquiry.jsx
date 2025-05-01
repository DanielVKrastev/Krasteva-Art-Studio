import { TrashIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import Pagination from "../partials/pagination/Pagination";
import NavigationLinks from "../partials/navigation-links/NavigationLinks";
import DeleteDrawer from "../partials/delete-drawer/DeleteDrawer";
import AnswerInquiry from "./answer-inquiry/Answer-inquiry";
import TableInquiry from "./table-inquiry/TableInquiry";
import availabilityInquiryApi from "../../../api/availabilityInquiryApi";
import LoadingSpinner from "../../partials/loading-spinner/LoadingSpinner";

export default function Inquiry() {
    const [inquiry, setInquiry] = useState([]);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [isLoading, setIsLoading] = useState(false);
    
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(inquiry.length / recordsPerPage);
    const startIndex = (currentPage - 1) * recordsPerPage;
    const currentInquiry = inquiry.slice(startIndex, startIndex + recordsPerPage);

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
            const data = await availabilityInquiryApi.getAll();
            setIsLoading(false);
            setInquiry(data);
        };
        fetchInitial();
    }, [recordsPerPage, isOpenDelete, isOpenUpdate]);

    const deleteInquiry = async (id) => {
        try{
            await availabilityInquiryApi.deleteInquiry(id);
            setInquiry(state => state.filter(painting => painting.id !== id));
        }catch(err){
            console.log(err);
        }
    };

    const openInquiryUpdate = (id, name) => {
        setIsOpenUpdate(true);
        setUpdateItem({id, name});
    };
 
    const closeInquiryUpdate = () => {
        setIsOpenUpdate(false);
        setUpdateItem(null);
    };

    const openInquiryDelete = (id, name) => {
        setIsOpenDelete(true);
        setDeleteItem({id, name});
    };

    const closeInquiryDelete = () => {
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
                            pageName={'Запитвания'}
                        />
                        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                            Всички запитвания
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
                                        placeholder="Търсене на запитване"
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

            <TableInquiry
                currentInquiry={currentInquiry}
                startIndex={startIndex}
                openDrawerUpdate={openInquiryUpdate}
                openDrawerDelete={openInquiryDelete}
            />

            <Pagination
                item={inquiry}
                currentPage={currentPage}
                totalPages={totalPages}
                currentItem={currentInquiry}
                setRecordsPerPagePaginationHandler={setRecordsPerPagePaginationHandler}
                handlePagination={handlePagination}
            />

            <div>

                {/* UPDATE INQUIRY */}
                {isOpenUpdate && <AnswerInquiry
                    updateId={updateItem.id}
                    item={updateItem.name}
                    closeInquiryUpdate={closeInquiryUpdate}
                />
                }

                {/* DELETE INQUIRY */}
                {isOpenDelete && <DeleteDrawer
                    deleteId={deleteItem.id}
                    item={deleteItem.name}
                    closeDrawerDelete={closeInquiryDelete}
                    handlerDelete={deleteInquiry}
                />
                }

            </div>

            {(isOpenUpdate || isOpenDelete) && <div onClick={() => { closeInquiryUpdate(); closeInquiryDelete(); }} className="bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-49"></div>}

        </>
    );
}