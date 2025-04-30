import { useEffect, useState } from "react";
import sizeApi from "../../../../api/sizeApi";
import availabilityInquiryApi from "../../../../api/availabilityInquiryApi";
import paintingApi from "../../../../api/paintingApi";
import dateConvertor from "../../../../utils/dateConvertor";

export default function AnswerInquiry({
    updateId,
    item,
    closeInquiryUpdate
}) {
    const [inquiry, setInquiry] = useState({});
    const [painting, setPainting] = useState({});

    useEffect(() => {
        const fetchInitial = async () => {
            try {
                const inquiryData = await availabilityInquiryApi.getOne(updateId);
                setInquiry(inquiryData);
                const paintingData = await paintingApi.getOne(inquiryData.paintingId);
                setPainting(paintingData);
            } catch (err) {
                console.log(err.message);
            }
        };
        fetchInitial();
    }, []);

const onSubmitUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const reply = formData.get('reply');
        const returnCall = formData.get('return-call');
4
        if(inquiry.answered === 'yes') { return };
        if(returnCall === null && reply === '') { return };
        
        try {

            const updateInquiryData = {
                reply,
                answered: 'yes'
            };

            if(returnCall !== null && reply === '') {
                updateInquiryData.reply = '(Позвънено)';
            }

            console.log(updateInquiryData);
            
            
            await availabilityInquiryApi.updateData(updateId, updateInquiryData);
            console.log("Reply.");

            closeInquiryUpdate();
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <>
            {/* Answer */}
            <div
                className={`fixed top-0 right-0 z-50 w-full h-screen max-w-xs p-4 overflow-y-auto transition-transform translate-x-0 bg-white`}
                tabIndex="-1"
            >
                <h5
                    className="inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase"
                    id="drawer-update-label"
                >
                    Отговор на "{item}"
                </h5>
                <button
                    aria-controls="drawer-update-product-default"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5"
                    data-drawer-dismiss="drawer-update-product-default"
                    onClick={closeInquiryUpdate}
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
                            <label htmlFor="update-email" className="block mb-2 text-sm font-medium text-gray-900">
                                Email
                            </label>
                            <input
                                type="text"
                                id="update-email"
                                name="size"
                                defaultValue={inquiry?.email}
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
                                name="size"
                                defaultValue={inquiry?.telephone}
                                readOnly
                                className="block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600"
                            />
                        </div>
                        <div>
                            <label htmlFor="update-painting" className="block mb-2 text-sm font-medium text-gray-900">
                                Запитване за картина
                            </label>
                            <input
                                type="text"
                                id="update-painting"
                                name="size"
                                defaultValue={painting.name}
                                readOnly
                                className="block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600"
                            />
                        </div>
                        <div>
                            <label htmlFor="update-createdAt" className="block mb-2 text-sm font-medium text-gray-900">
                                Дата на запитването
                            </label>
                            {dateConvertor(inquiry?.createdAt)}

                        </div>
                        <div>
                            <label htmlFor="update-painting" className="block mb-2 text-sm font-medium text-gray-900">
                                Картина
                            </label>
                            <img src={painting.imageUrl} alt={painting.name} />
                        </div>
                        <div>
                            <label htmlFor="update-reply" className="block mb-2 text-sm font-medium text-gray-900">
                                Отговор
                            </label>
                            <textarea
                                id="update-reply"
                                name="reply"
                                defaultValue={inquiry?.reply}
                                readOnly={inquiry?.reply}
                                rows="4"
                                className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                            />
                        </div>

                        <div className="flex items-center ps-4 border border-gray-300 rounded-sm">
                            <input id="bordered-checkbox-1" type="checkbox" name="return-call" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500" />
                            <label htmlFor="bordered-checkbox-1" className="w-full py-4 ms-2 text-sm font-medium ">Маркирай за позвъняване</label>
                        </div>

                        <div className="left-0 justify-center w-full pb-4 mt-10 space-x-4 sm:absolute sm:px-4 sm:mt-0">
                            <button
                                type="submit"
                                className={`w-full justify-center text-white ${inquiry?.answered === 'yes' ? `bg-gray-400` : `bg-indigo-700 hover:bg-indigo-800 focus:ring-indigo-300`}  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer`}
                                disabled={inquiry?.reply}
                            >
                                Върни отговор
                            </button>
                        </div>
                    </div>

                </form>
            </div>
        </>
    );
}