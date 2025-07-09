import addImage from "../../../../utils/addImage";
import aboutApi from "../../../../api/aboutApi";
import PhoneInput from "react-phone-number-input/input";
import { useState } from "react";

const IMGUR_CLIENT_ID = "70d48422a058d29";

export default function CreateAbout({
    setMessageShowToast,
    closeAboutCreate
}) {
    const [phoneValue, setPhoneValue] = useState('+359');
    const [selectedValueShowAddress, setSelectedValueShowAddress] = useState(false);

    const handleChangeSelectShowAddress = (e) => {
        setSelectedValueShowAddress(e.target.value);
    };

    const onSubmitCreate = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name');
        const description = formData.get('description');
        const telephone = formData.get('telephone');
        const address = formData.get('address');
        const email = formData.get('email');
        const image = formData.get('image');

        try {
            const createAboutData = {
                name,
                description,
                telephone,
                address,
                email,
                imageUrl: '',
                deletehash: ''
            };

            // Качване в Imgur
           if(image.size !== 0){
                const imageData = new FormData();
                imageData.append("image", image);
                
               const { link, deletehash } = await addImage(image);
                
                createAboutData.imageUrl = link;
                createAboutData.deletehash = deletehash;
            }

            console.log("About data to save:", createAboutData);
            await aboutApi.create(createAboutData);

            setMessageShowToast({ type: 'success', content: 'Успешно създаване "За мен"!' });
            closeAboutCreate();
        } catch (err) {
            console.error("Image upload or save failed:", err.message);
            closeAboutCreate();
            setMessageShowToast({ type: 'error', content: err.message });
        }

    }

    return (
        <>
            {/* Create */}
            <div
                className={`fixed top-0 right-0 z-50 w-full h-screen max-w-xs p-4 overflow-y-auto transition-transform translate-x-0 bg-white`}
                tabIndex="-1"
            >
                <h5
                    className="inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase"
                    id="drawer-update-label"
                >
                    Създава "За мен"
                </h5>
                <button
                    aria-controls="drawer-update-product-default"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5"
                    data-drawer-dismiss="drawer-update-product-default"
                    onClick={closeAboutCreate}
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
                                Име
                            </label>
                            <input
                                type="text"
                                id="update-name"
                                name="name"
                                placeholder="Име"
                                required
                                className="block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600"
                            />
                        </div>
                        <div className="space-y-4">
                            <label htmlFor="update-telephone" className="block mb-2 text-sm font-medium text-gray-900">
                                Телефон
                            </label>
                            <PhoneInput
                                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500"
                                name="telephone"
                                value={phoneValue}
                                onChange={setPhoneValue}
                                placeholder="+359..."
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="update-email" className="block mb-2 text-sm font-medium text-gray-900">
                                E-mail
                            </label>
                            <input
                                type="text"
                                id="update-email"
                                name="email"
                                placeholder="Email"
                                required
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
                                placeholder="Адрес"
                                required
                                className="block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600"
                            />
                        </div>

                        <div>
                            <label htmlFor="update-active" className="block mb-2 text-sm font-medium text-gray-900">
                                Да се показва ли адреса в сайта?
                            </label>
                            <select
                                id="update-active"
                                className="block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500"
                                name="active"
                                value={selectedValueShowAddress}
                                onChange={handleChangeSelectShowAddress}
                            >
                                <option value={false}>No</option>
                                <option value={true}>Yes</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="update-description" className="block mb-2 text-sm font-medium text-gray-900">
                                Описание
                            </label>
                            <textarea
                                id="update-description"
                                name="description"
                                rows="25"
                                placeholder="Описание"
                                className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
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

                            <input type="hidden" name="imageUrl"/>

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