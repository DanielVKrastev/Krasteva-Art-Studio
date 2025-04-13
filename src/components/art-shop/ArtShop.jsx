import React, { useState } from "react";
import { Link } from "react-router-dom";

const paintings = [
  {
    id: 1,
    name: "Лебедово езеро",
    size: "25см / 34см",
    price: 80,
    imageUrl: "./images/test_draw_swan.jpg",
  },
  {
    id: 2,
    name: "Залез",
    size: "30см / 40см",
    price: 95,
    imageUrl: "./images/test_draw.jpg",
  },
];

const categories = ["Пейзаж", "Портрет", "Абстракция"];
const sizes = ["20x30", "30x40", "40x60"];

export default function ArtShop() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const filteredPaintings = paintings.filter((p) => {
    return (!selectedCategory || p.name.includes(selectedCategory)) &&
           (!selectedSize || p.size.includes(selectedSize));
  });

  return (
    <div className="bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        <Link to="/" className="hover:underline">Начало</Link>
        <span className="mx-2">/</span>
        <span className="text-black font-semibold">Арт магазин</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
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
                    className={`hover:underline ${
                      selectedCategory === cat ? "font-bold text-indigo-600" : ""
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

        {/* Main Content */}
        <main className="w-full lg:w-3/4">
          {/* Заглавие и сортиране */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Арт магазин {selectedCategory ? `- ${selectedCategory}` : ""}
            </h2>
            <div className="mt-4 sm:mt-0">
              <select className="border rounded px-3 py-2 text-sm">
                <option>Сортиране</option>
                <option>Име, А до Я</option>
                <option>Име, Я до А</option>
                <option>Цена, възходяща</option>
                <option>Цена, низходяща</option>
              </select>
            </div>
          </div>

          {/* Карти */}
          {filteredPaintings.length === 0 ? (
            <p className="text-gray-600">Няма налични картини</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPaintings.map((paint) => (
                <div
                  key={paint.id}
                  className="bg-white rounded-lg shadow hover:shadow-xl transition overflow-hidden"
                >
                  <Link to={`/artshop/${paint.id}`}>
                    <img
                      src={paint.imageUrl}
                      alt={paint.name}
                      className="w-full h-56 object-cover"
                    />
                  </Link>
                  <div className="p-4 text-center">
                    <h3 className="font-semibold text-lg">
                      <Link to={`/artshop/${paint.id}`} className="hover:text-indigo-600">{paint.name}</Link>
                    </h3>
                    <p className="text-sm text-gray-500">Размери: {paint.size}</p>
                    <p className="text-indigo-600 font-bold">{paint.price} лв.</p>
                    <div className="mt-4 flex justify-center gap-2">
                      <button className="px-4 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700">Купи</button>
                      <button className="px-4 py-1 text-sm border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-100">Добави</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
