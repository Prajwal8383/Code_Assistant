import React, { useState } from 'react';

import axios from 'axios';

function App() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleComplete = async () => {
    setLoading(true);
    const response = await axios.post('http://localhost:5000/complete', { code: code });
    setOutput(response.data.text);
    setLoading(false);
  };

  const handleExplain = async () => {
    setLoading(true);
    const response = await axios.post('http://localhost:5000/explain', { code: code });
    setOutput(response.data.text);
    setLoading(false);
  };

  const handleBeautify = async () => {
    setLoading(true);
    const response = await axios.post('http://localhost:5000/beautify', { code, language: 'javascript' });
    setOutput(response.data.beautifiedCode);
    setLoading(false);
  };
  // const handleDebug = async () => {
  //   setLoading(true);
  //   const response = await axios.post('http://localhost:5000/debug', { code, language: 'javascript' });
  //   let aggregatedOutput = '';
  //     response.data.debugResults[0].forEach(messages => {
  //       messages.forEach(message => {
  //         aggregatedOutput += ${message.message} (Line ${message.line}, Column ${message.column})\n;
  //       });
  //     });
  //   console.log(aggregatedOutput);
  //   setOutput(aggregatedOutput);
  //   setLoading(false);
  // };

  return (
    <div className='App'>
     {/* <div className="bg-cover bg-center h-screen"
     style={{ backgroundImage: "url('/pngtree-website-technology-line-dark-background-image_2344719.jpg')",
      filter: 'contrast(0.5)' // Adjust the contrast value as needed
      }}> */}
      <h1 className='pl-4 pt-10 mb-4 text-2xl  font-bold font-sans text-gray-900 dark:text-black md:text-5xl lg:text-6xl flex justify-center'>Code Assistant</h1>
      <br></br>
      <div className='flex justify-center'>
      <textarea value={code} onChange={(e) => setCode(e.target.value)} rows='10' cols='100' className=' resize p-5 block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='Enter your code...'></textarea>
      </div>

      <br />
      <div className='flex justify-center'>
      <button className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700' onClick={handleComplete}>Complete Code</button>
      <button className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700' onClick={handleExplain}>Explain Code</button>
      <button className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700' onClick={handleBeautify}>Beautify Code</button>
      {/* <button onClick={handleDebug}>Debug Code</button> */}
      </div>

      <br />
      <div className='flex justify-center'>
      <textarea value={loading ? 'Loading...' : output} readOnly rows="15" cols="100" className='resize p-5 block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' ></textarea>
      </div>
      </div>
  
      
    
  );
}

export default App;