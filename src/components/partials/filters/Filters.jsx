import { useEffect } from "react";
import { useState } from "react";
import categoryApi from "../../../api/categoryApi";
import sizeApi from "../../../api/sizeApi";
import { useLocation, useNavigate } from "react-router-dom";

export default function Filters({
    selectedCategory,
    selectedSize,
    setSelectedCategory,
    setSelectedSize
}) {
    const location = useLocation();
    const navigate = useNavigate();
    
    const [categories, setCagetories] = useState([]);
    const [sizes, setSizes] = useState([]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const urlCategory = params.get("category");
        const urlSize = params.get("size");

        if (urlCategory) setSelectedCategory(urlCategory);
        if (urlSize) setSelectedSize(urlSize);
    }, []);

    const updateURLParams = (category, size) => {
        const params = new URLSearchParams();

        if (category) params.set("category", category);
        if (size) params.set("size", size);

        navigate({
            pathname: location.pathname,
            search: params.toString()
        });
    };

    useEffect(() => {

        (async function getCategories() {
            //TODO: Create hooks
            const getCategories = await categoryApi.getAll();
            setCagetories(getCategories);
        })();

        (async function getSizes() {
             //TODO: Create hooks
            const getSizes = await sizeApi.getAll();
            setSizes(getSizes);
        })();

    }, [])

    
    
    return (
        <>
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-1/4 space-y-6">
                {/* Categories */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-3">Категории</h3>
                    <ul className="space-y-2 text-sm">
                        {categories.map((category) => (
                            <li key={category.id}>
                                <button
                                    onClick={() => {
                                        setSelectedCategory(category.name);
                                        updateURLParams(category.name, selectedSize)
                                    }}
                                    className={`hover:underline ${selectedCategory === category.name ? "font-bold text-indigo-600" : ""
                                        }`}
                                >
                                    {category.name}
                                </button>
                            </li>
                        ))}
                        <li>
                            <button
                                onClick={() => {
                                    setSelectedCategory(null)
                                    updateURLParams(null, selectedSize);
                                }}
                                className="text-red-500 hover:underline"
                            >
                                ❌ Изчисти
                            </button>
                        </li>
                    </ul>
                </div>

                {/* Size */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-3">Размери</h3>
                    <div className="space-y-2 text-sm">
                        {sizes.map((size) => (
                            <label key={size.id} className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="size"
                                    value={size.size}
                                    checked={selectedSize === size.size}
                                    onChange={() => {
                                        setSelectedSize(size.size);
                                        updateURLParams(selectedCategory, size.size);
                                    }}
                                />
                                <span>{size.size}</span>
                            </label>
                        ))}
                        <button
                            onClick={() => {
                                setSelectedSize(null);
                                updateURLParams(selectedCategory, null);
                            }}
                            className="text-red-500 hover:underline"
                        >
                            ❌ Изчисти
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}