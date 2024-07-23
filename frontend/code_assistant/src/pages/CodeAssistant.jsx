import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

function CodeAssistant() {
  const navigate = useNavigate();
  const quotes = [
    "“Programs must be written for people to read, and only incidentally for machines to execute.” – Harold Abelson",
    "“Any fool can write code that a computer can understand. Good programmers write code that humans can understand.” – Martin Fowler",
    "“First, solve the problem. Then, write the code.” – John Johnson",
    "“Code is like humor. When you have to explain it, it’s bad.” – Cory House"
  ];

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 10000); // Change quote every 10 seconds

    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 w-full">
        <nav className="fixed top-0 left-0 w-full flex items-center justify-between p-4 bg-gray-800 bg-opacity-75">
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
        <div className="flex h-screen pt-20">
          <div className="w-1/2 flex flex-col justify-center items-center p-8">
            <AnimatePresence>
              <motion.p
                key={currentQuoteIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="text-lg md:text-xl lg:text-2xl font-serif  text-center px-4"
              
              >
                {quotes[currentQuoteIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
          <div className="w-1/2 relative">
            <img
              src="/programming.jpg"
              alt="Programming"
              className="w-full h-full object-cover"
            />
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default CodeAssistant;
