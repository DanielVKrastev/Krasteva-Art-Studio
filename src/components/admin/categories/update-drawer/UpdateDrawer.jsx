import { useEffect, useState } from "react";
import paintingApi from "../../../../api/paintingApi";
import deleteImage from "../../../../utils/deleteImage";
import addImage from "../../../../utils/addImage";
import categoryApi from "../../../../api/categoryApi";

export default function UpdateDrawer({
    updateId,
    item,
    setMessageShowToast,
    closeDrawerUpdate
}) {
    const [category, setCategory] = useState({});
   
    useEffect(() => {
        const fetchInitial = async () => {
            try {
                const categoryData = await categoryApi.getOne(updateId);
                setCategory(categoryData);
            } catch (err) {
                console.log(err.message);
            }
        };
        fetchInitial();
    }, []);

    const onSubmitUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name');
        const image = formData.get('image');
        const imageUrl = formData.get('imageUrl');

        try {
            const updateCategoryData = {
                name,
                imageUrl,
                deletehash: category?.deletehash
            };

            // Качване в Imgur
            if (image.size !== 0) {
                if(category.imageUrl != ""){
                    deleteImage(category.deletehash);
                }

                const { link, deletehash } = await addImage(image);

                updateCategoryData.imageUrl = link;
                updateCategoryData.deletehash = deletehash;
            }

            console.log("Painting data to update.");
            
            await categoryApi.updateData(updateId, updateCategoryData);
            setMessageShowToast({ type: 'success', content: `Успешно редактиране на категория "${name}".` });
            closeDrawerUpdate();
        } catch (err) {
            console.log(err.message);
            closeDrawerUpdate();
            setMessageShowToast({ type: 'error', content: 'Неуспешно редактиране на категория!' });
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
                    Редактиране на "{item}"
                </h5>
                <button
                    aria-controls="drawer-update-product-default"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5"
                    data-drawer-dismiss="drawer-update-product-default"
                    onClick={closeDrawerUpdate}
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

                <form onSubmit={onSubmitUpdate}>
                    <div className="space-y-4">
                        <div>
                        <label htmlFor="update-category" className="block mb-2 text-sm font-medium text-gray-900">
                                Име на категория
                            </label>
                            <input
                                type="text"
                                id="update-category"
                                name="name"
                                defaultValue={category?.name}
                                placeholder="Име на картина"
                                required
                                className="block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600"
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

                            <input type="hidden" name="imageUrl" defaultValue={category?.imageUrl} />

                            <label
                                htmlFor="update-image"
                                className="inline-block w-50 text-center cursor-pointer p-2.5 bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-gray-700 focus:ring-2 focus:ring-primary-600 focus:outline-none"
                            >
                                Избери снимка
                            </label>
                        </div>

                        <div className="left-0 justify-center w-full pb-4 mt-10 space-x-4 sm:absolute sm:px-4 sm:mt-0">
                            <button
                                type="submit"
                                className="w-full justify-center text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"

                            >
                                Редактирай
                            </button>
                        </div>
                    </div>

                </form>
            </div>
        </>
    );
}