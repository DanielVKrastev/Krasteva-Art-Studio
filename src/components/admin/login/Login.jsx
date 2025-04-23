import { Link, useNavigate } from "react-router";

import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../../../../firebase";
import { useContext, useState } from "react";
import { AdminContext } from "../../../contexts/AdminContext";

export default function Login() {
    const navigate = useNavigate();

    const { setAdmin } = useContext(AdminContext);

    const [emailInput, setEmailInput] = useState('');

    async function loginFormSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const {email, password } = Object.fromEntries(formData);

        try {
          const result = await signInWithEmailAndPassword(auth, email, password);
          
          const user = result.user;
          if (user) {
            setAdmin({
              uid: user.uid,
              email: user.email,
              isAdmin: true,
            });
    
            navigate("/admin");
          } else {
            alert("Нямате достъп до админ панела");
          }
        } catch (error) {
            console.log(error);
            
          alert("Грешен имейл или парола");
        }
      };
    
    return (
        <>
            <section
                className="mt-10 flex items-center justify-center"
            >
                <div className="flex flex-col items-center justify-center px-1 py-8 mx-auto lg:py-0 mb-20 ">

                    <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 z-0">
                        <img
                            className="w-45 h-20 mr-2"
                            src="/images/krasteva-art-studio-logo.png"
                            alt="logo"
                        />
                    </Link>
                    <div className="w-[95vw] bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow sm:max-w-md xl:p-0 mt-2 mb-16">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Админ панел - Вход
                            </h1>

                            <form className="space-y-4 md:space-y-6" onSubmit={loginFormSubmit}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                                        Еmail
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="name@company.com"
                                        defaultValue={emailInput}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                                        Парола
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        required
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input
                                                id="remember"
                                                aria-describedby="remember"
                                                type="checkbox"
                                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                                                required=""
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="remember" className="text-gray-500">
                                                Запомни ме
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                    Влизане
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>



        </>
    );
}