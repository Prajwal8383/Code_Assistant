import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import "../index.css"

function CodeAssistant() {
  const navigate = useNavigate();

  return (
    <div className="backgroundimage relative flex flex-col items-center justify-center min-h-screen text-white">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 w-full ">
        <nav className="fixed top-0 left-0 w-full flex items-center justify-between p-4 bg-gray-800 bg-opacity-75 shadow-lg">
          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mx-auto"
          >
            Code Assistant
          </motion.h1>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 font-bold transition duration-500 ease-in-out transform"
            onClick={() => { navigate('/login') }}
          >
            Get Started
          </motion.button>
        </nav>
        <div className="flex flex-col justify-center items-center h-screen pt-20 md:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="bg-gray-800 bg-opacity-75 p-6 w-1/2 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4">
              Welcome to Code Assistant
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-center px-4">
              Code Assistant is designed to help you write better code. It provides tools for indentation, code completion, and code explanation, making coding more efficient and understandable. 
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default CodeAssistant;
