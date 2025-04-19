import { Link } from "react-router-dom";

export default function PaintingCard({
    paint
}) {
    return (
        <div
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
    );
}