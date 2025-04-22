import { Link } from "react-router-dom";

export default function NavigationLinks({
    pageName
}) {
    return (
        <nav className="flex mb-5">
            <ol className="inline-flex items-center space-x-2 text-sm font-medium">
                <li className="inline-flex items-center">
                    <Link
                        to="/admin"
                        className="inline-flex items-center text-gray-600 hover:text-indigo-700"
                    >
                        <svg
                            className="w-5 h-5 mr-2.5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                        Админ Табло
                    </Link>
                </li>
                <li>
                    <div className="flex items-center">
                        <svg
                            className="w-6 h-6 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span
                            className="ml-2 text-gray-400"
                            aria-current="page"
                        >
                            {pageName}
                        </span>
                    </div>
                </li>
            </ol>
        </nav>
    );
}