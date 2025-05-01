import { CheckCircleIcon, ExclamationCircleIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { useEffect } from "react";

export default function MessageToast({ message, onClose }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose(false);
        }, 5000);

        return () => clearTimeout(timer); // Clear - unmount
    }, [onClose]);

    return (
        <>
            <div
                className="fixed right-4 top-25 z-50 transition px-3 py-4 pr-15  text-gray-500 bg-white rounded-lg shadow-sm"
                onClick={() => onClose(false)}
            >
                <XMarkIcon
                    className="absolute top-4 right-2 text-gray-400 hover:text-gray-900 cursor-pointer h-6 w-6"
                    onClick={() => onClose()}
                />
                <div className="flex items-center space-x-2">
                    {message.type === 'error' && <ExclamationCircleIcon className="w-6 h-6 text-red-500" />}
                    {message.type === 'success' && <CheckCircleIcon className="w-6 h-6 text-green-500" />}
                    <p className="font-light">{message.content}</p>
                </div>
            </div>
        </>
    );
}