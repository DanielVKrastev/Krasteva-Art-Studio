import { Link } from "react-router-dom";

export default function DeleteDrawer({
    closeDrawerDelete
}) {
    return (
        <>
            {/* DELETE DRAWER */}
            <div
                className={`fixed top-0 right-0 z-50 w-full h-screen max-w-xs p-4 overflow-y-auto transition-transform translate-x-0 bg-white`}
                tabIndex="-1"
            >
                <h5 className="inline-flex items-center text-sm font-semibold text-gray-500 uppercase" id="drawer-delete-label">
                    Изтриване на запис
                </h5>
                <button
                    aria-controls="drawer-delete-product-default"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5"
                    onClick={closeDrawerDelete}
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
                <svg className="w-10 h-10 mt-8 mb-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <h3 className="mb-6 text-lg text-gray-500">Сигурни ли сте, че искате да изтриете този запис?</h3>
                <div className="flex space-x-4">
                    <Link
                        to="#"
                        className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center"
                    >
                        Да, сигурен съм
                    </Link>
                    <Link
                        to="#"
                        onClick={closeDrawerDelete}
                        className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 border border-gray-200 font-medium rounded-lg text-sm px-3 py-2.5 text-center"
                    >
                        Отказ
                    </Link>
                </div>
            </div>
        </>
    );
}