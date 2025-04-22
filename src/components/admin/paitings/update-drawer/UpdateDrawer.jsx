export default function UpdateDrawer({
    updateId,
    item,
    closeDrawerUpdate
}) {
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
                    <span className="sr-only">Close menu</span>
                </button>

                <form action="#">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="update-name" className="block mb-2 text-sm font-medium text-gray-900">
                                Name
                            </label>
                            <input
                                type="text"
                                id="update-name"
                                name="title"
                                defaultValue="Education Dashboard"
                                placeholder="Type product name"
                                required
                                className="block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600"
                            />
                        </div>
                        <div>
                            <label htmlFor="update-category" className="block mb-2 text-sm font-medium text-gray-900">
                                Technology
                            </label>
                            <select
                                id="update-category"
                                className="block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500"
                            >
                                <option>Flowbite</option>
                                <option defaultValue="RE">React</option>
                                <option defaultValue="AN">Angular</option>
                                <option defaultValue="VU">Vue JS</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="update-price" className="block mb-2 text-sm font-medium text-gray-900">
                                Price
                            </label>
                            <input
                                type="number"
                                id="update-price"
                                name="price"
                                defaultValue="2999"
                                placeholder="$149"
                                required
                                className="block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600"
                            />
                        </div>
                        <div>
                            <label htmlFor="update-description" className="block mb-2 text-sm font-medium text-gray-900">
                                Description
                            </label>
                            <textarea
                                id="update-description"
                                rows="4"
                                defaultValue="Start developing with an open-source library of over 450+ UI components..."
                                placeholder="Enter product description"
                                className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="update-discount" className="block mb-2 text-sm font-medium text-gray-900">
                                Discount
                            </label>
                            <select
                                id="update-discount"
                                className="block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500"
                            >
                                <option>No</option>
                                <option defaultValue="5">5%</option>
                                <option defaultValue="10">10%</option>
                                <option defaultValue="20">20%</option>
                                <option defaultValue="30">30%</option>
                                <option defaultValue="40">40%</option>
                                <option defaultValue="50">50%</option>
                            </select>
                        </div>
                    </div>

                    <div className="bottom-0 left-0 flex justify-center w-full pb-4 mt-4 space-x-4 sm:absolute sm:px-4 sm:mt-0">
                        <button
                            type="submit"
                            className="w-full justify-center text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            Update
                        </button>
                        <button
                            type="button"
                            className="w-full sm:w-auto text-red-600 border border-red-600 hover:text-white hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-center"
                        >
                            Delete
                        </button>
                    </div>

                </form>
            </div>
        </>
    );
}