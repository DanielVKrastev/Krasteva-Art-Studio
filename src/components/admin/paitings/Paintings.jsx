import { Cog6ToothIcon, TrashIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { Link } from "react-router-dom";

const paitings = [
    {
        id: 0,
        active: "yes",
        category: "портрети",
        description: "Картината изобразява спокойна горска сцена, където брези са подредени покрай малко езеро. Водата отразява светлината, която прониква през дърветата, създавайки усещане за тишина и хармония. Зелените тонове на природата и светлината в дълбочината на гората придават усещане за свежест и спокойствие.",
        imageUrl: "https://lh3.googleusercontent.com/pw/AP1GczPeh6PTyogk7TnmzXsUr2bS9AUUjs3QjLmzptUKK8HHYo_vbRCNIGHz167fpVK3jFo-_HZqyANfOPQJUtbcngIiFjyDb4VVX2tSsrcvqkLPuULIBpPC_8XIeo9DGmP-HEygDRxTH2ZPY9DP_hIQhWD17Q=w1737-h1356-s-no-gm?authuser=0",
        name: "Брезова гора",
        paints: "акрил",
        price: 100,
        size: "25см / 35см",
        sold: "no"
    },
    {
        id: 1,
        active: "yes",
        category: "пейзажи",
        description: "Картината изобразява спокойна горска сцена, където брези са подредени покрай малко езеро. Водата отразява светлината, която прониква през дърветата, създавайки усещане за тишина и хармония. Зелените тонове на природата и светлината в дълбочината на гората придават усещане за свежест и спокойствие.",
        imageUrl: "https://lh3.googleusercontent.com/pw/AP1GczPeh6PTyogk7TnmzXsUr2bS9AUUjs3QjLmzptUKK8HHYo_vbRCNIGHz167fpVK3jFo-_HZqyANfOPQJUtbcngIiFjyDb4VVX2tSsrcvqkLPuULIBpPC_8XIeo9DGmP-HEygDRxTH2ZPY9DP_hIQhWD17Q=w1737-h1356-s-no-gm?authuser=0",
        name: "Лебедово езеро",
        paints: "акрил",
        price: 90,
        size: "25см / 35см",
        sold: "yes"
    }
];


export default function Paintings() {
    let sn = 0;

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
            <div className="p-4 bg-white text-gray-900 sm:ml-60 block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5">
                <div className="mt-14">
                    <div className="mb-4">
                        <nav className="flex mb-5" aria-label="Breadcrumb">
                            <ol className="inline-flex items-center space-x-2 text-sm font-medium">
                                <li className="inline-flex items-center">
                                    <Link
                                        to="/admin"
                                        className="inline-flex items-center text-gray-600 hover:text-indigo-700"
                                    >
                                        <svg
                                            className="w-5 h-5 mr-2.5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                        </svg>
                                        Админ Табло
                                    </Link>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <svg
                                            className="w-6 h-6 text-gray-400"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <span
                                            className="ml-2 text-gray-400"
                                            aria-current="page"
                                        >
                                            Картини
                                        </span>
                                    </div>
                                </li>
                            </ol>
                        </nav>
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
                                        placeholder="Търси картини"
                                    />
                                </div>
                            </form>
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


            <div className="flex flex-col sm:ml-60">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden shadow">
                            <table className="min-w-full divide-y divide-gray-200 table-fixed">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th scope="col" className="p-4">
                                            <input
                                                id="checkbox-all"
                                                type="checkbox"
                                                className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-2 focus:ring-indigo-500"
                                            />
                                        </th>
                                        {["Име / ID", "Категория", "Размери", "Бои", "Описание", "Цена", "Снимка", "Продадена", "Активна", "Действия"].map((title) => (
                                            <th
                                                key={title}
                                                className="p-4 text-xs font-medium text-left text-gray-500 uppercase"
                                            >
                                                {title}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {paitings.map((painting) => (
                                        <tr key={painting.id} className="hover:bg-gray-50">
                                            <td className="w-4 p-4">
                                                <input
                                                    id={`checkbox-${painting.id}`}
                                                    type="checkbox"
                                                    className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-2 focus:ring-indigo-500"
                                                />
                                            </td>
                                            <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap">
                                                <div className="text-base font-semibold text-gray-900">{painting.name}</div>
                                                <div className="text-sm font-normal text-gray-500">{sn++}</div>
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
                                                {painting.description.slice(0, 20)}...
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


            <div className="sm:ml-60 sticky bottom-0 right-0 p-4 bg-white border-t border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                    {/* Counter + arrows */}
                    <div className="flex items-center space-x-2">
                        <button className="inline-flex justify-center p-1 text-gray-500 rounded hover:text-gray-900 hover:bg-gray-100">
                            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                        <button className="inline-flex justify-center p-1 text-gray-500 rounded hover:text-gray-900 hover:bg-gray-100">
                            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                        <span className="text-sm font-normal text-gray-500">
                            Показани <span className="font-semibold text-gray-900">1–20</span> от{' '}
                            <span className="font-semibold text-gray-900">2290</span>
                        </span>
                    </div>

                    {/* Prev / Next бутони */}
                    <div className="flex items-center space-x-3 justify-start sm:justify-end">
                        <button className="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-indigo-700 rounded-lg hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300">
                            <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Назад
                        </button>
                        <button className="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-indigo-700 rounded-lg hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300">
                            Напред
                            <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>



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
                                    <option selected>Flowbite</option>
                                    <option value="RE">React</option>
                                    <option value="AN">Angular</option>
                                    <option value="VU">Vue JS</option>
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
                                    <option selected>No</option>
                                    <option value="5">5%</option>
                                    <option value="10">10%</option>
                                    <option value="20">20%</option>
                                    <option value="30">30%</option>
                                    <option value="40">40%</option>
                                    <option value="50">50%</option>
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
                <div
                    className={`fixed top-0 right-0 z-50 w-full h-screen max-w-xs p-4 overflow-y-auto transition-transform ${isOpenDelete ? 'translate-x-0' : 'translate-x-full'} bg-white`}
                    tabIndex="-1"
                >
                    <h5 className="inline-flex items-center text-sm font-semibold text-gray-500 uppercase" id="drawer-delete-label">
                        Delete item
                    </h5>
                    <button
                        aria-controls="drawer-delete-product-default"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5"
                        onClick={closeDrawerDelete}
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
                    <svg className="w-10 h-10 mt-8 mb-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <h3 className="mb-6 text-lg text-gray-500">Are you sure you want to delete this product?</h3>
                    <div className="flex space-x-4">
                        <Link
                            to="#"
                            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center"
                        >
                            Yes, I'm sure
                        </Link>
                        <Link
                            to="#"
                            onClick={closeDrawerDelete}
                            className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 border border-gray-200 font-medium rounded-lg text-sm px-3 py-2.5 text-center"
                        >
                            No, cancel
                        </Link>
                    </div>
                </div>

            </div>
            {(isOpenUpdate || isOpenDelete) && <div onClick={() => { closeDrawerUpdate(); closeDrawerDelete() }} className="bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-49"></div>}

        </>
    );
}