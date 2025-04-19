import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import paintingApi from "../../api/paintingApi";

export default function SearchResults() {
    const [paintings, setPaintings] = useState([]);

    useEffect(() => {
        (async function () {
            const paintings = await paintingApi.getAll();
            setPaintings(paintings);
        })();
    }, []);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("query")?.toLowerCase();

    let filteredPaintings = paintings.filter(p => p.name.toLowerCase().includes(query));
    if(query && filteredPaintings.length === 0){
        filteredPaintings = paintings.filter(p =>  p.size.toLowerCase().replace(/\s/g, '').includes(query.replace(/\s/g, '').toLowerCase()));
    }

    return (
        <div className="bg-gray-100 py-16 px-6 sm:px-16 lg:px-20">
            {/* Breadcrumb */}
            <div className="mb-6 text-sm text-gray-500">
                <Link to="/" className="text-indigo-600 hover:underline">Начало</Link>
                <span className="mx-2">/</span>
                <span className="text-black font-semibold">Резултати за: “{query}”</span>
            </div>

            <h2 className="text-2xl font-bold mb-8 text-gray-800">
                Намерени резултати: {filteredPaintings.length}
            </h2>

                    {/* Search result */}
                    {filteredPaintings.length === 0 ? (
                        <p className="text-gray-600">Няма налични картини</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredPaintings.map((paint) => (
                                <div
                                    key={paint.id}
                                    className="bg-white rounded-lg shadow hover:shadow-xl transition overflow-hidden"
                                >
                                    <div className="relative">
                                        <Link to={`/portfolio/details/${paint.id}`}>
                                            <img
                                                src={paint.imageUrl}
                                                alt={paint.name}
                                                className="w-full h-56 object-cover"
                                            />
                                        </Link>

                                        {/* Badge bottom left */}
                                        {paint.sold === 'yes' ? (
                                            <span className="absolute bottom-4 left-2 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                                                Продадена
                                            </span>
                                        ) : (
                                            <span className="absolute bottom-4 left-2 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                                                В наличност
                                            </span>
                                        )}
                                    </div>
                                    <div className="p-4 text-center">
                                        <h3 className="font-semibold text-lg">
                                            <Link to={`/portfolio/details/${paint.id}`} className="hover:text-indigo-600">{paint.name}</Link>
                                        </h3>
                                        <p className="text-sm text-gray-500">Размери: {paint.size}</p>

                                        {/* Badge */}
                                        {paint.sold === 'yes' ? (
                                            <p className="text-indigo-600 font-bold">по запитване</p>
                                        ) : (
                                            <p className="text-indigo-600 font-bold">{paint.price} лв.</p>
                                        )}

                                        <div className="mt-4 flex justify-center gap-2">
                                            <Link to={`/portfolio/details/${paint.id}`} className="px-4 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700">Детайли</Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
        </div>
    );
}
