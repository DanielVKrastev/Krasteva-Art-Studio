import { useEffect, useState } from "react";
import paintingApi from "../../../../api/paintingApi";


export default function PaintingListCell({ paintingId }) {
    const [painting, setPaintings] = useState([]);

    useEffect(() => {
        const fetchPaintings = async () => {
            try {
                const fetchInitial = async () => {
                    const data = await paintingApi.getOne(paintingId);
                    setPaintings(data);
                };
                fetchInitial();
            } catch (err) {
                console.error("Грешка при зареждане на картини:", err.message);
            }
        };

        fetchPaintings();
    }, [paintingId]);

    return (
        <div className="flex flex-wrap gap-4">
            <div className="flex flex-col items-center text-center">
                <img
                    src={painting?.imageUrl}
                    alt={painting?.name}
                    className="w-14 h-14 object-cover rounded shadow"
                />
                <span className="text-xs mt-1 text-gray-700">{painting?.name}</span>
            </div>
        </div>
    );
}