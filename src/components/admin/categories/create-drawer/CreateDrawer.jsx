import categoryApi from "../../../../api/categoryApi";
import addImage from "../../../../utils/addImage";

export default function CreateDrawer({
    setMessageShowToast,
    closeDrawerCreate
}) {
    const onSubmitCreate = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name');
        const image = formData.get('image');

        try {
            const createCategoryData = {
                name,
                imageUrl: '',
                deletehash: ''
            };

            // Upload in Imgur
            if(image.size !== 0){
                const imageData = new FormData();
                imageData.append("image", image);
                
               const { link, deletehash } = await addImage(image);
                
                createCategoryData.imageUrl = link;
                createCategoryData.deletehash = deletehash;
            }

            console.log("Category data to save:", createCategoryData);

            await categoryApi.create(createCategoryData);
            setMessageShowToast({ type: 'success', content: `Успешно създаване на категория "${name}".` });
            closeDrawerCreate();
        } catch (err) {
            console.error("Image upload or save failed:", err.message);
            closeDrawerCreate();
            setMessageShowToast({ type: 'error', content: 'Неуспешно създаване на категория!' });
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
                    Създаване на категория
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
                            <label htmlFor="update-category" className="block mb-2 text-sm font-medium text-gray-900">
                                Име на категория
                            </label>
                            <input
                                type="text"
                                id="update-category"
                                name="name"
                                placeholder="Име на категория"
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
                                Създай
                            </button>
                        </div>
                    </div>

                </form>
            </div>
        </>
    );
}