import { Link } from "react-router-dom";
import { EnvelopeOpenIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { BookOpenIcon, ChartPieIcon, ChatBubbleBottomCenterIcon, CircleStackIcon, EnvelopeIcon, PaintBrushIcon, TagIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

export default function Sidebar() {
    const [openCrudMenu, setOpenCrudMenu] = useState(true);
    const [openUserMenu, setOpenUserMenu] = useState(false);

    const openCrudHandleMenu = () => {
        setOpenCrudMenu(state => !state);
    };

    const openUserDropMenu = () => {
        setOpenUserMenu(state => !state);
    };


    return (
        <>
            <nav className="fixed top-0 z-49 w-full bg-white border-b border-gray-200">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end">
                            <button
                                data-drawer-target="logo-sidebar"
                                data-drawer-toggle="logo-sidebar"
                                aria-controls="logo-sidebar"
                                type="button"
                                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                            >
                                <span className="sr-only">Open sidebar</span>
                                <svg
                                    className="w-6 h-6"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        clipRule="evenodd"
                                        fillRule="evenodd"
                                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                                    />
                                </svg>
                            </button>
                            <Link to="/admin" className="flex ms-2 md:me-24">
                                <img
                                    src="/images/krasteva-art-studio-logo.png"
                                    className="h-12 me-3"
                                    alt="FlowBite Logo"
                                />
                            </Link>
                        </div>
                        <div className="flex items-center">
                            <div className="relative items-center ms-3">
                                <div>
                                    <button
                                        onClick={openUserDropMenu}
                                        type="button"
                                        className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
                                    >
                                        <span className="sr-only">Open user menu</span>
                                        <img
                                            className="w-8 h-8 rounded-full"
                                            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                            alt="user photo"
                                        />
                                    </button>
                                </div>
                                <div
                                    className={`${!openUserMenu? 'hidden' : ''} absolute right-0 z-50 mt-2 w-48 text-base list-none bg-white divide-y divide-gray-100 rounded-sm shadow-lg`}
                                >
                                    <div className="px-4 py-3" role="none">
                                        <p
                                            className="text-sm text-gray-900"
                                            role="none"
                                        >
                                            Elica Krasteva
                                        </p>
                                        <p
                                            className="text-sm font-medium text-gray-900 truncate"
                                            role="none"
                                        >
                                            elicakrasteva@gmail.com
                                        </p>
                                    </div>
                                    <ul className="py-1" role="none">
                                        <li>
                                            <Link
                                                to="/admin"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                role="menuitem"
                                            >
                                                Табло
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/admin/settings"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                role="menuitem"
                                            >
                                                Настройки
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="#"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                                                role="menuitem"
                                            >
                                                Изход
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <aside
                id="logo-sidebar"
                className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 "
                aria-label="Sidebar"
            >
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link
                                to="/admin"
                                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                            >
                                <ChartPieIcon className="w-6 h-6 text-indigo-700" />
                                <span className="ms-3">Табло</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/admin/orders"
                                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
                            >
                                <BookOpenIcon className="w-6 h-6 text-indigo-700" />
                                <span className="flex-1 ms-3 whitespace-nowrap">Поръчки</span>
                            </Link>
                        </li>
                        <li>
                            <button
                                onClick={openCrudHandleMenu}
                                type="button"
                                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100"
                            >
                                <PaintBrushIcon className="w-6 h-6 text-indigo-700" />
                                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                                    Картини
                                </span>
                                 <div className="w-6 h-6 text-indigo-700">{openCrudMenu ? '▲' : '▼'}</div>
                            </button>
                            <ul className="py-2 space-y-2" hidden={!openCrudMenu}>
                                <li>
                                    <Link
                                        to="/admin/paintings"
                                        className="flex items-center w-full p-2 pl-11 rounded-lg hover:bg-gray-300"
                                    >
                                        <PaintBrushIcon className="w-6 h-6 text-indigo-700" />
                                        <span className="flex-1 ms-3 whitespace-nowrap">Картини</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/admin/paintings/categories"
                                        className="flex items-center w-full p-2 pl-11 rounded-lg hover:bg-gray-300"
                                    >
                                        <TagIcon className="w-6 h-6 text-indigo-700" />
                                        <span className="flex-1 ms-3 whitespace-nowrap">Категории</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/admin/paintings/size"
                                        className="flex items-center w-full p-2 pl-11 rounded-lg hover:bg-gray-300"
                                    >
                                        <TagIcon className="w-6 h-6 text-indigo-700" />
                                        <span className="flex-1 ms-3 whitespace-nowrap">Размери</span>
                                    </Link>
                                </li>
                            </ul>
                        </li>

                        <li>
                            <Link
                                to="/admin/inquiry"
                                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 "
                            >
                                <EnvelopeIcon className="w-6 h-6 text-indigo-700" />
                                <span className="flex-1 ms-3 whitespace-nowrap">Запитвания</span>
                                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">
                                    3
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/admin/contact-messages"
                                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 "
                            >
                                <ChatBubbleBottomCenterIcon className="w-6 h-6 text-indigo-700" />
                                <span className="flex-1 ms-3 whitespace-nowrap">Съобщения</span>
                                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">
                                    3
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="#"
                                className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100 "
                            >
                                <svg
                                    className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 "
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 18 16"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                                    />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Изход</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    );
}