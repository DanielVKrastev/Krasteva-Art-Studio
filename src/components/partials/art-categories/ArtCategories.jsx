import { useEffect, useState } from "react";
import categoryApi from "../../../api/categoryApi";

export default function ArtCategories() {
    const [categories, setCategories] = useState([]);

        useEffect(() => {
            const fetchInitial = async () => {
                const data = await categoryApi.getAll();
                setCategories(data);
            };
            fetchInitial();
        }, []);

    return (
        <section className="py-12 border border-gray-300">
           <hr className="w-10 mx-auto border-t-2 border-indigo-700 text-center" />
            <div className="max-w-7xl mx-auto px-4">
              
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold">Категории</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    
                 
                    {categories.map((category, index) => (
                        <a
                            key={index}
                            href="#"
                            className="relative group overflow-hidden rounded-2xl shadow-lg"
                            data-aos="fade"
                            data-aos-delay={index * 100}
                        >
                            <div className="overflow-hidden m-0 p-0">
                                <img
                                    src={category?.imageUrl}
                                    alt={category?.name}
                                    className="w-full h-72 object-cover transform transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>

                            <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-60 transition duration-300" style={{ opacity: 0.5 }}/>

                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 text-center">
                                <span className="text-sm uppercase tracking-wide text-gray-200">Категория</span>
                                <h3 className="text-2xl font-bold mt-2">{category?.name}</h3>
                            </div>
                        </a>
                      
                    ))}
                </div>
            </div>
        </section>
    );
}
