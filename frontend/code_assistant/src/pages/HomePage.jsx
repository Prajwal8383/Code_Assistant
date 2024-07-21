import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdContentCopy } from 'react-icons/md';
import axios from 'axios';
import { handleBeautify, handleComplete, handleCopy, handleCopytoClipboard, handleExplain } from '../../controllers/Homepage';

function HomePage() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [savedEntries, setSavedEntries] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem('userId'));

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSavedEntries = async () => {
      if (userId) {
        try {
          console.log(userId);
          const token = localStorage.getItem("token");
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
          },
        };
          const response = await axios.get(`http://localhost:5000/api/v1/user/${userId}`,config);

          setSavedEntries(response.data);

        } catch (error) {
          console.error('Error fetching saved entries:', error);
        }
      }
    };

    fetchSavedEntries();
  }, []);

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.post('http://localhost:5000/api/v1/save', {
        userId,
        prompt: code,
        response: output
      },config);
      setSavedEntries([...savedEntries, response.data]);

    } catch (error) {
      console.error('Error saving entry:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  const handleDelete=async (entryId)=>{
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try{
      const response = await axios.delete(`http://localhost:5000/api/v1/delete/${entryId}`,config);
      setSavedEntries(savedEntries.filter(entry => entry._id !== entryId));
      console.log(response.data);
    }catch(error){
      console.log(error);
    }
  }

  return (
    <div className="flex h-screen">
      <div className="w-1/5 bg-gray-900 text-white p-4 flex flex-col">
        <div className="mb-4 flex justify-center space-x-6">
          <button 
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" 
            onClick={() => navigate('/compile')}>
            Compiler
          </button>
          <button 
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" 
            onClick={handleLogout}>
            Logout
          </button>
        </div>
        <h2 className="text-xl font-bold mb-4">Saved Entries</h2>
        <div className="overflow-y-auto">
          {savedEntries.length > 0 ? (
            savedEntries.map(entry => (
              <div key={entry._id} className="mb-4 p-2 bg-gray-800 rounded">
                <h3 className="font-semibold">{entry.prompt}</h3>
                <pre className="text-sm text-gray-300">{entry.response}</pre>
                <button className="mt-6 text-white bg-gray-300 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-black dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" onClick={()=>{handleDelete(entry._id)}}>Delete</button>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-300">No saved entries</p>
          )}
        </div>
      </div>
      <div className="w-4/5 p-4">
        <h1 className="pl-4 pt-10 mb-4 text-2xl font-bold font-sans text-gray-900 dark:text-black md:text-5xl lg:text-6xl flex justify-center">Code Assistant</h1>
        <br />
        <div className="flex justify-center">
          <textarea 
            value={code} 
            onChange={(e) => setCode(e.target.value)} 
            rows='10' 
            cols='100' 
            className="resize p-5 block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder='Enter your code...'>
          </textarea>
        </div>
        <br />
        <div className="flex justify-center">
          <button 
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" 
            onClick={() => handleComplete(code, setOutput, setLoading)}>
            Complete Code
          </button>
          <button 
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" 
            onClick={() => handleExplain(code, setOutput, setLoading)}>
            Explain Code
          </button>
          <button 
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" 
            onClick={() => handleBeautify(code, setOutput, setLoading)}>
            Indent Code
          </button>
          <button 
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" 
            onClick={() => handleCopy(output, setCode)}>
            Copy to input
          </button>
          <button 
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" 
            onClick={handleSave}>
            Save Entry
          </button>
        </div>
        <br />
        <div>
          <div className="flex justify-center">
            <textarea 
              value={loading ? 'Loading...' : output} 
              readOnly 
              rows="15" 
              cols="100" 
              className="resize p-5 block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </textarea>
            <MdContentCopy 
              className="text-2xl cursor-pointer text-gray-500 hover:text-gray-600 hover:scale-105 transition-transform duration-200" 
              onClick={() => handleCopytoClipboard(output)} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
