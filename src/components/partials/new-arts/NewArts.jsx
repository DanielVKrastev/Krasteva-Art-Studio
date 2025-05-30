import { useEffect, useState } from "react";
import paintingApi from "../../../api/paintingApi";
import PaintingCard from "../paiting-card/PaintingCard";
import LoadingSpinner from "../loading-spinner/LoadingSpinner";

export default function NewArts() {
    const [paintings, setPaintings] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        (async function () {
            setIsLoading(true);
            const paintings = await paintingApi.getLimit(3);
            setIsLoading(false);
            setPaintings(paintings);
        })();
    }, []);

    return (
        <>
            {isLoading && <LoadingSpinner />}

            <section className="py-12 border border-gray-300">
                <div className="max-w-7xl mx-auto px-4">
                    <hr className="w-10 mx-auto border-t-2 border-indigo-700 text-center" />
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold">Нови картини</h2>
                    </div>
                    {paintings.length === 0 ? (
                        <p className="text-gray-600">Няма налични картини</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {paintings.map((paint) => (
                                <PaintingCard key={paint.id} paint={paint} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
