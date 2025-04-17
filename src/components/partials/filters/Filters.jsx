import { useEffect } from "react";
import { useState } from "react";
import categoryApi from "../../../api/categoryApi";
import sizeApi from "../../../api/sizeApi";

export default function Filters({
    selectedCategory,
    selectedSize,
    setSelectedCategory,
    setSelectedSize
}) {
    const [categories, setCagetories] = useState([]);
    const [sizes, setSizes] = useState([]);

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
                {/* Категории */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-3">Категории</h3>
                    <ul className="space-y-2 text-sm">
                        {categories.map((category) => (
                            <li key={category.id}>
                                <button
                                    onClick={() => setSelectedCategory(category.name)}
                                    className={`hover:underline ${selectedCategory === category ? "font-bold text-indigo-600" : ""
                                        }`}
                                >
                                    {category.name}
                                </button>
                            </li>
                        ))}
                        <li>
                            <button
                                onClick={() => setSelectedCategory(null)}
                                className="text-red-500 hover:underline"
                            >
                                ❌ Изчисти
                            </button>
                        </li>
                    </ul>
                </div>

                {/* Размери */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-3">Размери</h3>
                    <div className="space-y-2 text-sm">
                        {sizes.map((size) => (
                            <label key={size} className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="size"
                                    value={size}
                                    checked={selectedSize === size}
                                    onChange={() => setSelectedSize(size)}
                                />
                                <span>{size}</span>
                            </label>
                        ))}
                        <button
                            onClick={() => setSelectedSize(null)}
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