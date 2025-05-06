import { useEffect, useState } from "react";
import orderApi from "../../../../api/orderApi";
import PaintingListCell from "../../partials/painting-list-cell/PaintingListCell";
import dateConvertor from "../../../../utils/dateConvertor";
import paintingApi from "../../../../api/paintingApi";

export default function UpdateOrder({
    updateId,
    item,
    setMessageShowToast,
    closeOrderUpdate
}) {
    const [order, setOrder] = useState({});

    useEffect(() => {
        const fetchInitial = async () => {
            try {
                const orderData = await orderApi.getOne(updateId);
                setOrder(orderData);
                setSelectedValueStatus(orderData.status);
            } catch (err) {
                console.log(err.message);
            }
        };
        fetchInitial();
    }, []);

    const [loadingData, setLoadingData] = useState(false);

    // For select inputs
    const [selectedValueStatus, setSelectedValueStatus] = useState(order?.status || '');

    const handleChangeSelectStatus = (e) => {
        setSelectedValueStatus(e.target.value);
    };

    const onSubmitUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const town = formData.get('town');
        const address = formData.get('address');
        const postCode = formData.get('postCode');
        const status = formData.get('status');

        try {
            const updateOrderData = {
                town,
                address,
                postCode,
                status,
            };

            if(status === 'отказана' || status === 'върната'){
                await paintingApi.markForSell(order.paintingIds)
            }

            console.log("Order data to update.");

            await orderApi.updateData(updateId, updateOrderData);
            setMessageShowToast({ type: 'success', content: `Успешно редактиране на поръчка №${item}.` });
            closeOrderUpdate();
        } catch (err) {
            console.log(err.message);
            closeOrderUpdate();
            setMessageShowToast({ type: 'error', content: 'Неуспешно редактиране на поръчка!' });
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
                    onClick={closeOrderUpdate}
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
                            <label htmlFor="update-firstName" className="block mb-2 text-sm font-medium text-gray-900">
                                Име
                            </label>
                            <input
                                type="text"
                                id="update-firstName"
                                name="firstName"
                                defaultValue={order?.firstName}
                                readOnly
                                className="block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600"
                            />
                        </div>
                        <div>
                            <label htmlFor="update-lastName" className="block mb-2 text-sm font-medium text-gray-900">
                                Фамилия
                            </label>
                            <input
                                type="text"
                                id="update-lastName"
                                name="lastName"
                                defaultValue={order?.lastName}
                                readOnly
                                className="block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600"
                            />
                        </div>
                        <div>
                            <label htmlFor="update-email" className="block mb-2 text-sm font-medium text-gray-900">
                                Email
                            </label>
                            <input
                                type="text"
                                id="update-email"
                                name="email"
                                defaultValue={order?.email}
                                readOnly
                                className="block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600"
                            />
                        </div>
                        <div>
                            <label htmlFor="update-telephone" className="block mb-2 text-sm font-medium text-gray-900">
                                Телефон
                            </label>
                            <input
                                type="text"
                                id="update-telephone"
                                name="telephone"
                                defaultValue={order?.telephone}
                                readOnly
                                className="block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600"
                            />
                        </div>
                        <div>
                            {order.paintingIds?.map(paintingId => (
                                <PaintingListCell key={paintingId} paintingId={paintingId} />
                            ))}
                        </div>
                        <div>
                            <label htmlFor="update-town" className="block mb-2 text-sm font-medium text-gray-900">
                                Град
                            </label>
                            <input
                                type="text"
                                id="update-town"
                                name="town"
                                defaultValue={order?.town}
                                className="block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600"
                            />
                        </div>
                        <div>
                            <label htmlFor="update-address" className="block mb-2 text-sm font-medium text-gray-900">
                                Адрес
                            </label>
                            <input
                                type="text"
                                id="update-address"
                                name="address"
                                defaultValue={order?.address}
                                className="block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600"
                            />
                        </div>
                        <div>
                            <label htmlFor="update-postCode" className="block mb-2 text-sm font-medium text-gray-900">
                                Пощенски код
                            </label>
                            <input
                                type="text"
                                id="update-postCode"
                                name="postCode"
                                defaultValue={order?.postCode}
                                className="block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600"
                            />
                        </div>
                        <div>
                            <label htmlFor="update-totalPrice" className="block mb-2 text-sm font-medium text-gray-900">
                                Цена
                            </label>
                            <input
                                type="text"
                                id="update-totalPrice"
                                defaultValue={order?.totalPrice}
                                readOnly
                                className="block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600"
                            />
                        </div>
                        <div>
                            <label htmlFor="update-createdAt" className="block mb-2 text-sm font-medium text-gray-900">
                                Дата на поръчка
                            </label>
                            {dateConvertor(order?.createdAt)}
                            
                        </div>
                        <div>
                            <label htmlFor="update-status" className="block mb-2 text-sm font-medium text-gray-900">
                                Статус
                            </label>
                            <select
                                id="update-status"
                                className="block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500"
                                name="status"
                                value={selectedValueStatus}
                                onChange={handleChangeSelectStatus}
                            >
                                {
                                    ['изчакване', 'изпратена', 'отказана', 'доставена', 'върната'].map((status) => (
                                        <option key={status} value={status}>
                                            {status}
                                        </option>
                                    ))
                                }

                            </select>
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