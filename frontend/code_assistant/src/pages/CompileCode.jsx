import { useState } from "react";
import React from 'react'
import { MdContentCopy } from 'react-icons/md';
import { handleClear, handleCompile } from "../../controllers/CompileCode";
import { handleCopytoClipboard } from "../../controllers/Homepage";
import { useNavigate } from "react-router-dom";

const CompileCode = () => {
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const [input, setInput]=useState('');
    const [loading, setLoading] = useState(false);

    const navigate=useNavigate();
  return (
    <div>
     <div className='App'>
        <h1 className=' pt-10 mb-4 text-2xl font-bold font-sans text-gray-900 dark:text-black md:text-5xl lg:text-6xl flex justify-center'>Code Assistant</h1>
        
        <div className='flex justify-center space-x-4'>
            <textarea value={code} onChange={(e) => setCode(e.target.value)} rows='15' cols='100' className='resize p-5 block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='Enter your code...'></textarea>
            <textarea value={input} onChange={(e) => setInput(e.target.value)} rows='15' cols='50' className='resize p-5 block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='Enter your inputs...'></textarea>

        </div>
        <br />
        <div className='flex justify-center'>
          <button className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700' onClick={() => handleCompile(code, input, setOutput, setLoading)}>Run Code</button>
          <button className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700' onClick={() => handleClear(setCode,setInput,setOutput)}>Clear</button>
          <button className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" onClick={()=>{navigate("/home")}}>Home</button>

        </div>
        <br />
        <div className='flex justify-center'>
          <textarea value={loading ? 'Loading...' : output} readOnly rows="10" cols="160" className='resize p-5 block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'></textarea>
          <MdContentCopy className="text-2xl cursor-pointer text-gray-500 hover:text-gray-600 hover:scale-105 transition-transform duration-200" onClick={() => handleCopytoClipboard(output)} />
        </div>
      </div>

    </div>
  )
}

export default CompileCode
