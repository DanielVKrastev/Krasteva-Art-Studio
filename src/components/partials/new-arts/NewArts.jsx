import { useEffect, useState } from "react";
import paintingApi from "../../../api/paintingApi";
import { Link } from "react-router-dom";

export default function NewArts() {
  const [paintings, setPaintings] = useState([]);

  useEffect(() => {
      (async function () {
          const paintings = await paintingApi.getLimit(3);
          setPaintings(paintings);
      })();
  }, []);
  
  return (
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
                                <div
                                    key={paint.id}
                                    className="bg-white rounded-lg shadow hover:shadow-xl transition overflow-hidden"
                                >
                                    <Link to={`/portfolio/details/${paint.id}`}>
                                        <img
                                            src={paint.imageUrl}
                                            alt={paint.name}
                                            className="w-full h-56 object-cover"
                                        />
                                    </Link>
                                    <div className="p-4 text-center">
                                        <h3 className="font-semibold text-lg">
                                            <Link to={`/portfolio/details/${paint.id}`} className="hover:text-indigo-600">{paint.name}</Link>
                                        </h3>
                                        <p className="text-sm text-gray-500">Размери: {paint.size}</p>
                                        <div className="mt-4 flex justify-center gap-2">
                                            <Link to={`/portfolio/details/${paint.id}`} className="px-4 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700">Детайли</Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
      </div>
    </section>

  );
}
