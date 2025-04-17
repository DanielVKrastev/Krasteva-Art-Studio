import React from "react";
import { useLocation, Link } from "react-router-dom";

const paintings = [
    {
        id: 1,
        name: "Лебедово езеро",
        size: "25см / 34см",
        price: 80,
        imageUrl: "/images/test_draw_swan.jpg",
    },
    {
        id: 2,
        name: "Залез",
        size: "30см / 40см",
        price: 95,
        imageUrl: "/images/test_draw.jpg",
    },
    {
        id: 3,
        name: "Гора в мъгла",
        size: "40см / 60см",
        price: 120,
        imageUrl: "/images/test_draw.jpg",
    },
];

export default function SearchResults() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("name")?.toLowerCase() || "";
    console.log(query);

    const filteredPaintings = paintings.filter(p => p.name.toLowerCase().includes(query));

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

            {filteredPaintings.length === 0 ? (
                <p className="text-gray-600">❌ Няма картини, съответстващи на „{query}“</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPaintings.map(paint => (
                        <div key={paint.id} className="bg-white rounded-lg shadow hover:shadow-xl transition overflow-hidden">
                            <Link to={`/artshop/details/${paint.id}`}>
                                <img
                                    src={paint.imageUrl}
                                    alt={paint.name}
                                    className="w-full h-56 object-cover"
                                />
                            </Link>
                            <div className="p-4 text-center">
                                <h3 className="font-semibold text-lg">
                                    <Link to={`/artshop/details/${paint.id}`} className="hover:text-indigo-600">{paint.name}</Link>
                                </h3>
                                <p className="text-sm text-gray-500">Размери: {paint.size}</p>
                                <p className="text-indigo-600 font-bold">{paint.price} лв.</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
