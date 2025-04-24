import { useEffect, useState } from "react";
import categoryApi from "../../../../api/categoryApi";
import sizeApi from "../../../../api/sizeApi";
import axios from "axios";
import paintingApi from "../../../../api/paintingApi";

const IMGUR_CLIENT_ID = "70d48422a058d29";

export default function CreateDrawer({
    closeDrawerCreate
}) {
    const [categories, setCategories] = useState([]);
    const [size, setSize] = useState([]);


    const [loadingData, setLoadingData] = useState(false);

    useEffect(() => {
        const fetchInitial = async () => {
            try {
                setLoadingData(true);
                const categoriesData = await categoryApi.getAll();
                const sizeData = await sizeApi.getAll();
                setCategories(categoriesData);
                setSize(sizeData);
            } catch (err) {
                console.log(err.message);
            } finally {
                setLoadingData(false);
            }
        };
        fetchInitial();
    }, []);

    // For select inputs
    const [selectedValueSold, setSelectedValueSold] = useState('no');

    const handleChangeSelectSold = (e) => {
        setSelectedValueSold(e.target.value);
    };

    const [selectedValueActive, setSelectedValueActive] = useState('yes');

    const handleChangeSelectActive = (e) => {
        setSelectedValueActive(e.target.value);
    };

    const [selectedValueCategory, setSelectedValueCategory] = useState('');

    const handleChangeSelectCategory = (e) => {
        setSelectedValueCategory(e.target.value);
    };

    const [selectedValueSize, setSelectedValueSize] = useState('');

    const handleChangeSelectSize = (e) => {
        setSelectedValueSize(e.target.value);
    };

    // For price fo fixed 2
    const [price, setPrice] = useState('');

    const handleBlur = () => {
        if (price !== "") {
            const formatted = parseFloat(price).toFixed(2);
            setPrice(formatted);
        }
    };

    const handleChange = (e) => {
        setPrice(e.target.value);
    };

    const onSubmitCreate = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name');
        const category = formData.get('category');
        const size = formData.get('size');
        const paints = formData.get('paints');
        const description = formData.get('description');
        const price = formData.get('price');
        const image = formData.get('image');
        const sold = formData.get('sold');
        const active = formData.get('active');

        try {
            const createPaintingData = {
                name,
                category,
                size,
                paints,
                description,
                price,
                sold,
                active,
                imageUrl: '',
                deletehash: ''
            };

            // Качване в Imgur
            if(image.size !== 0){
                const imageData = new FormData();
                imageData.append("image", image);
                
                const uploadRes = await fetch('http://localhost:3000/upload', { // TODO: when deploy: https://api.imgur.com/3/upload
                    method: 'POST',
                    /*
                    headers: {
                            'Authorization': `Client-ID ${IMGUR_CLIENT_ID}`,
                            'Content-Type': 'application/x-www-form-urlencoded',
                            },
                    */
                    body: imageData,
                });
                
                const data = await uploadRes.json();
                
                if (!uploadRes.ok) throw new Error(data?.error || 'Upload failed');
                
                const { link, deletehash } = data;
                
                createPaintingData.imageUrl = link;
                createPaintingData.deletehash = deletehash;
            }

            console.log("Painting data to save:", createPaintingData);

            // Тук добави кода за запис във Firebase DB
            // await firebaseDbApi.save(createPaintingData)
            await paintingApi.create(createPaintingData);

            closeDrawerCreate();
        } catch (err) {
            console.error("Image upload or save failed:", err.message);
        }

    }

    return (
        <>
            {/* UPDATE DRAWER */}
            <div
                className={`fixed top-0 right-0 z-50 w-full h-screen max-w-xs p-4 overflow-y-auto transition-transform translate-x-0 bg-white`}
                tabIndex="-1"
            >
                <h5
                    className="inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase"
                    id="drawer-update-label"
                >
                    Създаване на картина
                </h5>
                <button
                    aria-controls="drawer-update-product-default"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5"
                    data-drawer-dismiss="drawer-update-product-default"
                    onClick={closeDrawerCreate}
                    type="button"
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        />
                    </svg>
                    <span className="sr-only">Затвори</span>
                </button>

                <form onSubmit={onSubmitCreate}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="update-name" className="block mb-2 text-sm font-medium text-gray-900">
                                Име на картина
                            </label>
                            <input
                                type="text"
                                id="update-name"
                                name="name"
                                placeholder="Име на картина"
                                required
                                className="block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600"
                            />
                        </div>
                        <div>
                            <label htmlFor="update-category" className="block mb-2 text-sm font-medium text-gray-900">
                                Категория
                            </label>
                            <select
                                id="update-category"
                                className="block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500"
                                name="category"
                                disabled={loadingData}
                                value={selectedValueCategory}
                                onChange={handleChangeSelectCategory}
                            >
                                {loadingData ? (
                                    <option>Зареждане...</option>
                                ) : (
                                    categories.map((category) => (
                                        <option key={category.id} value={category.name}>
                                            {category.name}
                                        </option>
                                    ))
                                )}

                            </select>
                        </div>
                        <div>
                            <label htmlFor="update-size" className="block mb-2 text-sm font-medium text-gray-900">
                                Размери
                            </label>
                            <select
                                id="update-size"
                                className="block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500"
                                name="size"
                                disabled={loadingData}
                                value={selectedValueSize}
                                onChange={handleChangeSelectSize}
                            >
                                {loadingData ? (
                                    <option>Зареждане...</option>
                                ) : (
                                    size.map((s) => (
                                        <option key={s} value={s}>
                                            {s}
                                        </option>
                                    ))
                                )}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="update-paints" className="block mb-2 text-sm font-medium text-gray-900">
                                Бои
                            </label>
                            <input
                                type="text"
                                id="update-paints"
                                name="paints"
                                placeholder="акрил"
                                required
                                className="block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600"
                            />
                        </div>
                        <div>
                            <label htmlFor="update-description" className="block mb-2 text-sm font-medium text-gray-900">
                                Описание
                            </label>
                            <textarea
                                id="update-description"
                                name="description"
                                rows="4"
                                placeholder="описание..."
                                className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="update-price" className="block mb-2 text-sm font-medium text-gray-900">
                                Цена
                            </label>
                            <input
                                type="number"
                                id="update-price"
                                name="price"
                                value={price}
                                placeholder="100.00"
                                min={0}
                                step="0.10"
                                required
                                className="block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        <div>
                            <label htmlFor="update-image" className="block mb-2 text-sm font-medium text-gray-900">
                                Смимка
                            </label>
                            <input
                                id="update-image"
                                type="file"
                                name="image"
                                className="hidden"
                            />

                            <label
                                htmlFor="update-image"
                                className="inline-block w-50 text-center cursor-pointer p-2.5 bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-gray-700 focus:ring-2 focus:ring-primary-600 focus:outline-none"
                            >
                                Избери снимка
                            </label>
                        </div>

                        <div>
                            <label htmlFor="update-sold" className="block mb-2 text-sm font-medium text-gray-900">
                                Продадена
                            </label>
                            <select
                                id="update-sold"
                                className="block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500"
                                name="sold"
                                value={selectedValueSold}
                                onChange={handleChangeSelectSold}
                            >
                                <option value="no">No</option>
                                <option value="yes">Yes</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="update-active" className="block mb-2 text-sm font-medium text-gray-900">
                                Активна
                            </label>
                            <select
                                id="update-active"
                                className="block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500"
                                name="active"
                                value={selectedValueActive}
                                onChange={handleChangeSelectActive}
                            >
                                <option value="no">No</option>
                                <option value="yes">Yes</option>
                            </select>
                        </div>

                        <div className="left-0 justify-center w-full pb-4 mt-10 space-x-4 sm:absolute sm:px-4 sm:mt-0">
                            <button
                                type="submit"
                                className="w-full justify-center text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"

                            >
                                Създай
                            </button>
                        </div>
                    </div>

                </form>
            </div>
        </>
    );
}