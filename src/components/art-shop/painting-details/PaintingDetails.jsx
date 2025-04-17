import { Link } from "react-router-dom";

const painting = {
    imageUrl: "https://example.com/painting.jpg", 
    name: "Заглавие на картината",
    description: "Това е описание на картината. Може да съдържа информация за автор, техника, стил и вдъхновение.",
    size: "60x80 см",
    category: "Пейзаж",
    paints: "Маслени бои",
    price: "250",
    id: "1"
};

export default function PaintingDetails() {
    return (
        <div className="container mx-auto py-8 ">
            {/* Breadcrumb */}
            <div className="mb-6 text-sm text-gray-500">
                <Link to="/" className="text-indigo-600 hover:underline">Начало</Link>
                <span className="mx-2">/</span>
                <Link to="/artshop" className="text-indigo-600 hover:underline">Арт магазин</Link>
                <span className="mx-2">/</span>
                <span className="text-black font-semibold">{painting.name}</span>
            </div>
            
            {/* Painting Section */}
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0">
                {/* Image Section */}
                <div className="flex-1 md:w-1/2">
                    <img src="/images/test_draw.jpg" alt={painting.name} className="w-full h-auto rounded-lg shadow-lg" />
                </div>
                
                {/* Description Section */}
                <div className="flex-1 md:w-1/2 px-6">
                    <h2 className="text-3xl font-bold text-black">{painting.name}</h2>
                    <p className="mt-4 text-gray-600">{painting.description}</p>
                    
                    <div className="mt-6">
                        <p><i><b>Размери: {painting.size}</b></i></p>
                        <p><i><b>Категория: {painting.category}</b></i></p>
                        <p><i><b>Бои: {painting.paints}</b></i></p>
                    </div>

                    <p className="mt-4 text-2xl text-primary font-semibold text-indigo-600">Цена: {painting.price} лв.</p>

                    <div className="mt-6 flex gap-2">
                        <Link type="button" to={`/artshop/details/${painting.id}`} className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">Купи</Link>
                        <button className="px-4 py-1 text-sm border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-100">Добави</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
