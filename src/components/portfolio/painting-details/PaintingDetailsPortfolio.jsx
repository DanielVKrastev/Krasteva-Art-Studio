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

export default function PaintingDetailsPortfolio() {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Формата е изпратена!");
    };

    return (
        <div className="container mx-auto py-8">
            {/* Breadcrumb */}
            <div className="mb-6 text-sm text-gray-500">
                <Link to="/" className="text-indigo-600 hover:underline">Начало</Link>
                <span className="mx-2">/</span>
                <Link to="/portfolio" className="text-indigo-600 hover:underline">Портфолио</Link>
                <span className="mx-2">/</span>
                <span className="text-black font-semibold">{painting.name}</span>
            </div>

            {/* Painting Section */}
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0">
                {/* Image Section */}
                <div className="flex-1 md:w-1/2">
                    <img src="/images/test_draw.jpg" alt={painting.name} className="w-full h-auto rounded-lg shadow-lg" />
                </div>

                {/* Description & Form */}
                <div className="flex-1 md:w-1/2 px-6">
                    <h2 className="text-3xl font-bold text-black">{painting.name}</h2>
                    <p className="mt-4 text-gray-600">{painting.description}</p>

                    <div className="mt-6 space-y-2">
                        <p><i><b>Размери: {painting.size}</b></i></p>
                        <p><i><b>Категория: {painting.category}</b></i></p>
                        <p><i><b>Бои: {painting.paints}</b></i></p>
                    </div>

                    <p className="mt-4 text-2xl text-indigo-600 font-semibold">Цена: {painting.price} лв.</p>

                    <div className="mt-6">
                        <p className="mb-4">
                            Направете запитване за поръчка.<br />
                            Или се обадете на: <span className="font-semibold">+359 11 111 1111</span>
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="flex flex-col md:flex-row md:space-x-4">
                                <div className="flex-1">
                                    <label htmlFor="c_fname" className="block text-sm font-medium text-gray-700 mb-1">
                                        Име <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="c_fname"
                                        name="c_fname"
                                        type="text"
                                        required
                                        className="bg-white w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>

                                <div className="flex-1 mt-4 md:mt-0">
                                    <label htmlFor="c_lname" className="block text-sm font-medium text-gray-700 mb-1">
                                        Фамилия <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="c_lname"
                                        name="c_lname"
                                        type="text"
                                        required
                                        className="bg-white w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="c_email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Имейл <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="c_email"
                                    name="c_email"
                                    type="email"
                                    required
                                    className="bg-white w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            <button
                                type="submit"
                                className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition duration-300"
                            >
                                Направи запитване
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
