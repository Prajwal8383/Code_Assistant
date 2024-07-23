import React from 'react'
import { useNavigate } from 'react-router-dom';

export const LoginSuccess = () => {
    const navigate = useNavigate();

    const handleSuccess = async () => {
        console.log("Checking token in localStorage...");
        const token = localStorage.getItem("token");
        if (token) {
            console.log("Token found:", token);
            setTimeout(() => {
                navigate('/home');
            }, 100);
        } else {
            console.log("Token not found.");
        }
    };

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='text-center'>
                <h1 className='mb-4 text-2xl font-bold font-sans text-gray-900 dark:text-black md:text-5xl'>Login Successful</h1>
                <button 
                    onClick={handleSuccess} 
                    className='mt-4 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
                >
                    Go to HomePage
                </button>
            </div>
        </div>
    );
};

export default LoginSuccess;
