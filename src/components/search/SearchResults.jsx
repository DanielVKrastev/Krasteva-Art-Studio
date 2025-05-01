import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import paintingApi from "../../api/paintingApi";
import PaintingCard from "../partials/paiting-card/PaintingCard";
import LoadingSpinner from "../partials/loading-spinner/LoadingSpinner";

export default function SearchResults() {
    const [paintings, setPaintings] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        (async function () {
            setIsLoading(true);
            const paintings = await paintingApi.getAll();
            setIsLoading(false);
            setPaintings(paintings);
        })();
    }, []);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("query")?.toLowerCase();

    let filteredPaintings = paintings.filter(p => p.name.toLowerCase().includes(query));
    if (query && filteredPaintings.length === 0) {
        filteredPaintings = paintings.filter(p => p.size.toLowerCase().replace(/\s/g, '').includes(query.replace(/\s/g, '').toLowerCase()));
    }

    return (
        <>
            {isLoading && <LoadingSpinner />}

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
                            <PaintingCard key={paint.id} paint={paint} />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
