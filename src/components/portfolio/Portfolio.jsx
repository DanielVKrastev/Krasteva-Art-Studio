import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Filters from "../partials/filters/Filters";
import paintingApi from "../../api/paintingApi";

export default function Portfolio() {
    const location = useLocation();
    const navigate = useNavigate();

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [paintings, setPaintings] = useState([]);

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
            const paintings = await paintingApi.getAll();
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

    return (
        <div className="bg-gray-100 py-16 px-6 sm:px-16 lg:px-20">
            {/* Breadcrumb */}
            <div className="mb-6 text-sm text-gray-500">
                <Link to="/" className="text-indigo-600 hover:underline">Начало</Link>
                <span className="mx-2">/</span>
                <span className="text-black font-semibold">Портфолио</span>
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

                <main className="w-full lg:w-3/4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">
                            Портфолио {selectedCategory ? `- ${selectedCategory}` : ""}
                        </h2>
                    </div>

                    {/* Grid with pagination */}
                    {paginatedPaintings.length === 0 ? (
                        <p className="text-gray-600">Няма налични картини</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {paginatedPaintings.map((paint) => (
                                <div
                                    key={paint.id}
                                    className="bg-white rounded-lg shadow hover:shadow-xl transition overflow-hidden"
                                >
                                    <Link to={`/portfolio/details/${paint.id}`}>
                                        <img
                                            src={paint.imageUrl}
                                            alt={paint.name}
                                            className="w-full h-56 object-cover"
                                        />
                                    </Link>
                                    <div className="p-4 text-center">
                                        <h3 className="font-semibold text-lg">
                                            <Link to={`/portfolio/details/${paint.id}`} className="hover:text-indigo-600">{paint.name}</Link>
                                        </h3>
                                        <p className="text-sm text-gray-500">Размери: {paint.size}</p>

                                        {/* SOLD badge */}
                                        {paint.sold === 'yes' ? (
                                            <div className="mt-2">
                                                <span className="inline-block bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                                                    Продадена
                                                </span>
                                            </div>
                                        ):
                                        (
                                            <div className="mt-2">
                                                <span className="inline-block bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                                                    В наличност
                                                </span>
                                            </div>
                                        )
                                        }

                                        <div className="mt-4 flex justify-center gap-2">
                                            <Link to={`/portfolio/details/${paint.id}`} className="px-4 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700">Детайли</Link>
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
    );
}
