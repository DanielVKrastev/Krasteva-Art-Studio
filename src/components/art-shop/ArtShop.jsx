import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Filters from "../partials/filters/Filters";
import paintingApi from "../../api/paintingApi";
import { useCartContext } from "../../contexts/CartContext";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import LoadingSpinner from "../partials/loading-spinner/LoadingSpinner";

export default function ArtShop() {
    const location = useLocation();
    const navigate = useNavigate();

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [paintings, setPaintings] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const { cart, setCart } = useCartContext();

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;


    const updateURLParamsPage = (page) => {
        const params = new URLSearchParams(location.search);

        if (page) params.set("page", page);

        navigate({
            pathname: location.pathname,
            search: params.toString()
        });
    };

    useEffect(() => {
        (async function () {
            setIsLoading(true);
            const paintings = await paintingApi.getAllForSales();
            setIsLoading(false);
            setPaintings(paintings);
        })();
    }, []);

    // Filter paintings
    const filteredPaintings = paintings.filter((p) => {
        return (!selectedCategory || p.category?.includes(selectedCategory)) &&
            (!selectedSize || p.size?.includes(selectedSize));
    });

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const paginatedPaintings = filteredPaintings.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredPaintings.length / itemsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const handleAddInCart = (painting) => {
        setCart(painting); // set in local storage cart item
    };

    return (
        <>
            {isLoading && <LoadingSpinner />}

            <div className="bg-gray-100 py-16 px-6 sm:px-16 lg:px-20">
                {/* Breadcrumb */}
                <div className="mb-6 text-sm text-gray-500">
                    <Link to="/" className="text-indigo-600 hover:underline">Начало</Link>
                    <span className="mx-2">/</span>
                    <span className="text-black font-semibold">Арт магазин</span>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">

                    <Filters
                        selectedCategory={selectedCategory}
                        selectedSize={selectedSize}
                        setSelectedCategory={(val) => {
                            setSelectedCategory(val);
                            setCurrentPage(1);
                        }}
                        setSelectedSize={(val) => {
                            setSelectedSize(val);
                            setCurrentPage(1);
                        }}
                    />

                    {/* Main Content */}
                    <main className="w-full lg:w-3/4">
                        {/* Заглавие и сортиране */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">
                                Арт магазин {selectedCategory ? `- ${selectedCategory}` : ""}
                            </h2>
                            {/*
                            <div className="mt-4 sm:mt-0">
                                <select 
                                    className="border rounded px-3 py-2 text-sm" 
                                    defaultValue={""}>
                                    <option disabled value="">Сортиране</option>
                                    <option value="oldest">От стара към нова</option>
                                    <option value="newest">От нова към стара</option>
                                    <option value="name-asc">Име, А до Я</option>
                                    <option value="name-desc">Име, Я до А</option>
                                    <option value="price-asc">Цена, възходяща</option>
                                    <option value="price-desc">Цена, низходяща</option>
                                </select>
                            </div>
                            */}
                        </div>

                        {/* Grid with pagination */}
                        {paginatedPaintings.length === 0 ? (
                            <p className="text-gray-600">Няма налични картини</p>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {paginatedPaintings.map((painting) => (
                                    <div
                                        key={painting.id}
                                        className="bg-white rounded-lg shadow hover:shadow-xl transition overflow-hidden"
                                    >
                                        <Link to={`/artshop/details/${painting.id}`}>
                                            <img
                                                src={painting.imageUrl}
                                                alt={painting.name}
                                                className="w-full h-56 object-cover"
                                            />
                                        </Link>
                                        <div className="p-4 text-center">
                                            <h3 className="font-semibold text-lg">
                                                <Link to={`/artshop/details/${painting.id}`} className="hover:text-indigo-600">{painting.name}</Link>
                                            </h3>
                                            <p className="text-sm text-gray-500">Размери: {painting.size}</p>
                                            <p className="text-indigo-600 font-bold">{painting.price} лв.</p>
                                            <div className="mt-4 flex justify-center gap-2">
                                                <Link type="button" to={`/artshop/details/${painting.id}`} className="px-4 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700">Детайли</Link>
                                                <button
                                                    onClick={() => handleAddInCart(painting)}
                                                    className="px-4 py-1 text-sm border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-100 cursor-pointer flex items-center gap-1"
                                                >
                                                    <ShoppingCartIcon className="w-5 h-5 text-indigo-700" />
                                                    Добави
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <nav aria-label="Page navigation example" className="mt-10 flex justify-center">
                                <ul className="flex items-center -space-x-px h-10 text-base">
                                    <li>
                                        <button
                                            className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
                                            disabled={currentPage === 1}
                                            onClick={() => {
                                                handlePageChange(currentPage - 1);
                                                updateURLParamsPage(currentPage - 1);
                                            }}
                                        >
                                            <span className="sr-only">Previous</span>
                                            <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                                            </svg>
                                        </button>
                                    </li>
                                    {Array.from({ length: totalPages }, (_, i) => (
                                        <li key={i}>
                                            <button
                                                onClick={() => {
                                                    handlePageChange(i + 1);
                                                    updateURLParamsPage(i + 1)
                                                }}
                                                className={`flex items-center justify-center px-4 h-10 leading-tight border border-gray-300 ${currentPage === i + 1
                                                    ? "z-10 text-blue-600 bg-blue-50 border-blue-300 hover:bg-blue-100 hover:text-blue-700"
                                                    : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700"
                                                    }`}
                                            >
                                                {i + 1}
                                            </button>
                                        </li>
                                    ))}
                                    <li>
                                        <button
                                            className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
                                            disabled={currentPage === totalPages}
                                            onClick={() => {
                                                handlePageChange(currentPage + 1);
                                                updateURLParamsPage(currentPage + 1);
                                            }}
                                        >
                                            <span className="sr-only">Next</span>
                                            <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                            </svg>
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        )}

                    </main>
                </div>
            </div>


        </>
    );
}
