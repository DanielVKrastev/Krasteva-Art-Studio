export default function Filters({
    selectedCategory,
    selectedSize,
    setSelectedCategory,
    setSelectedSize
}) {    
    const categories = ["Пейзаж", "Портрет", "Абстракция"];
    const sizes = ["20x30", "30x40", "40x60"];

    return (
        <>
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-1/4 space-y-6">
                {/* Категории */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-3">Категории</h3>
                    <ul className="space-y-2 text-sm">
                        {categories.map((cat) => (
                            <li key={cat}>
                                <button
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`hover:underline ${selectedCategory === cat ? "font-bold text-indigo-600" : ""
                                        }`}
                                >
                                    {cat}
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