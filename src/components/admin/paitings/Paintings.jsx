import { Cog6ToothIcon, TrashIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import paintingApi from "../../../api/paintingApi";
import Pagination from "../partials/pagination/Pagination";
import NavigationLinks from "../partials/navigation-links/NavigationLinks";
import DeleteDrawer from "../partials/delete-drawer/DeleteDrawer";

export default function Paintings() {
    let sn = 0;
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
    const [isOpenDelete, setIsOpenDelete] = useState(false);

    const openDrawerUpdate = () => {
        setIsOpenUpdate(true);
    };

    const closeDrawerUpdate = () => {
        setIsOpenUpdate(false);
    };

    const openDrawerDelete = () => {
        setIsOpenDelete(true);
    };

    const closeDrawerDelete = () => {
        setIsOpenDelete(false);
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
                                        {["Име / ID", "Категория", "Размери", "Бои", "Описание", "Цена", "Снимка", "Продадена", "Активна", "Действия"].map((title) => (
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
                                    {currentPaintings.map((painting, index) => (
                                        <tr key={painting.id} className="hover:bg-gray-50">
                                            <td className="w-4 p-6">
                                                <input
                                                    id={`checkbox-${painting.id}`}
                                                    type="checkbox"
                                                    className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-2 focus:ring-indigo-500"
                                                />
                                            </td>
                                            <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap">
                                                <div className="text-base font-semibold text-gray-900">{painting.name}</div>
                                                <div className="text-sm font-normal text-gray-500">{startIndex + index + 1}</div>
                                            </td>
                                            <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap">
                                                {painting.category}
                                            </td>
                                            <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs">
                                                {painting.size}
                                            </td>
                                            <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap">
                                                {painting.paints}
                                            </td>
                                            <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap">
                                                {painting.description?.slice(0, 20)}...
                                            </td>
                                            <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap">
                                                {painting.price}
                                            </td>
                                            <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap">
                                                <img src={painting.imageUrl} alt={painting.name} className="w-20" />
                                            </td>
                                            <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap">
                                                {painting.sold}
                                            </td>
                                            <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap">
                                                {painting.active}
                                            </td>
                                            <td className="p-4 space-x-2 whitespace-nowrap">
                                                <Cog6ToothIcon onClick={openDrawerUpdate} className="inline-flex items-center w-11 h-11 px-3 py-2 text-white bg-indigo-700 rounded-lg hover:bg-indigo-800 focus:ring-2 focus:ring-indigo-300" />

                                                <TrashIcon onClick={openDrawerDelete} className="inline-flex items-center w-11 h-11 px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-300" />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

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
                <div
                    className={`fixed top-0 right-0 z-50 w-full h-screen max-w-xs p-4 overflow-y-auto transition-transform ${isOpenUpdate ? 'translate-x-0' : 'translate-x-full'} bg-white`}
                    tabIndex="-1"
                    hidden={!isOpenUpdate}
                >
                    <h5
                        className="inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase"
                        id="drawer-update-label"
                    >
                        Update Product
                    </h5>
                    <button
                        aria-controls="drawer-update-product-default"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5"
                        data-drawer-dismiss="drawer-update-product-default"
                        onClick={closeDrawerUpdate}
                        type="button"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            />
                        </svg>
                        <span className="sr-only">Close menu</span>
                    </button>

                    <form action="#">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="update-name" className="block mb-2 text-sm font-medium text-gray-900">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="update-name"
                                    name="title"
                                    defaultValue="Education Dashboard"
                                    placeholder="Type product name"
                                    required
                                    className="block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600"
                                />
                            </div>
                            <div>
                                <label htmlFor="update-category" className="block mb-2 text-sm font-medium text-gray-900">
                                    Technology
                                </label>
                                <select
                                    id="update-category"
                                    className="block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500"
                                >
                                    <option>Flowbite</option>
                                    <option defaultValue="RE">React</option>
                                    <option defaultValue="AN">Angular</option>
                                    <option defaultValue="VU">Vue JS</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="update-price" className="block mb-2 text-sm font-medium text-gray-900">
                                    Price
                                </label>
                                <input
                                    type="number"
                                    id="update-price"
                                    name="price"
                                    defaultValue="2999"
                                    placeholder="$149"
                                    required
                                    className="block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600"
                                />
                            </div>
                            <div>
                                <label htmlFor="update-description" className="block mb-2 text-sm font-medium text-gray-900">
                                    Description
                                </label>
                                <textarea
                                    id="update-description"
                                    rows="4"
                                    defaultValue="Start developing with an open-source library of over 450+ UI components..."
                                    placeholder="Enter product description"
                                    className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="update-discount" className="block mb-2 text-sm font-medium text-gray-900">
                                    Discount
                                </label>
                                <select
                                    id="update-discount"
                                    className="block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500"
                                >
                                    <option>No</option>
                                    <option defaultValue="5">5%</option>
                                    <option defaultValue="10">10%</option>
                                    <option defaultValue="20">20%</option>
                                    <option defaultValue="30">30%</option>
                                    <option defaultValue="40">40%</option>
                                    <option defaultValue="50">50%</option>
                                </select>
                            </div>
                        </div>

                        <div className="bottom-0 left-0 flex justify-center w-full pb-4 mt-4 space-x-4 sm:absolute sm:px-4 sm:mt-0">
                            <button
                                type="submit"
                                className="w-full justify-center text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Update
                            </button>
                            <button
                                type="button"
                                className="w-full sm:w-auto text-red-600 border border-red-600 hover:text-white hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-center"
                            >
                                Delete
                            </button>
                        </div>

                    </form>
                </div>

                {/* DELETE DRAWER */}
                {isOpenDelete && <DeleteDrawer 
                                    closeDrawerDelete={closeDrawerDelete}
                                />
                }

            </div>

            {(isOpenUpdate || isOpenDelete) && <div onClick={() => { closeDrawerUpdate(); closeDrawerDelete() }} className="bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-49"></div>}

        </>
    );
}