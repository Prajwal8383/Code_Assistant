import React from 'react';
import { useNavigate } from 'react-router-dom';

function CodeAssistant() {
  const navigate = useNavigate();

 

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-800 via-black-500 to-red-500 text-white animate-gradient">
    <h1 className="text-6xl font-bold mb-8">Code Assistant</h1>
    <div className='flex justify-center space-x-6'>
    <button 
      className="bg-white text-indigo-500 font-bold py-2 px-4 rounded-full transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:bg-indigo-200"
      onClick={()=>{navigate('/home')}}
    >
      Code Queries
    </button>
    <button 
      className="bg-white text-indigo-500 font-bold py-2 px-4 rounded-full transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:bg-indigo-200"
      onClick={()=>{navigate('/compile')}}
    >
      Run Code
    </button>
    </div>
  </div>
  );
}

export default CodeAssistant;
