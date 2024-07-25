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
          const token = localStorage.getItem("token");
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const response = await axios.get(`http://localhost:5000/api/v1/user/${userId}`, config);
          setSavedEntries(response.data);
        } catch (error) {
          console.error('Error fetching saved entries:', error);
        }
      }
    };

    fetchSavedEntries();
  }, [userId]);

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
      }, config);
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

  const handleDelete = async (entryId) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.delete(`http://localhost:5000/api/v1/delete/${entryId}`, config);
      setSavedEntries(savedEntries.filter(entry => entry._id !== entryId));
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-900 text-white p-4 flex flex-col">
        <div className="mb-6 flex flex-col space-y-4">
          <button 
            className="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
            onClick={() => navigate('/compile')}>
            Compiler
          </button>
          <button 
            className="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
            onClick={handleLogout}>
            Logout
          </button>
        </div>
        <h2 className="text-xl font-bold mb-4">Saved Entries</h2>
        <div className="overflow-y-auto flex-1">
          {savedEntries.length > 0 ? (
            savedEntries.map(entry => (
              <div key={entry._id} className="mb-4 p-4 bg-gray-800 rounded-lg shadow-md border border-gray-700">
                <h3 className="font-semibold text-lg mb-2">{entry.prompt}</h3>
                <pre className="text-sm text-gray-300 whitespace-pre-wrap">{entry.response}</pre>
                <button 
                  className="mt-4 text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2"
                  onClick={() => handleDelete(entry._id)}>
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-300">No saved entries</p>
          )}
        </div>
      </div>
      {/* Main Content */}
      <div className="w-3/4 p-4 flex flex-col">
        <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-black text-center">Code Assistant</h1>
        <div className="flex flex-col items-center mb-6 space-y-4">
          <textarea 
            value={code} 
            onChange={(e) => setCode(e.target.value)} 
            rows='11' 
            className="resize-none p-4 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full max-w-4xl"
            placeholder='Enter your code...'>
          </textarea>
          <div className="flex justify-center space-x-4">
            <button 
              className="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
              onClick={() => handleComplete(code, setOutput, setLoading)}>
              Complete Code
            </button>
            <button 
              className="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
              onClick={() => handleExplain(code, setOutput, setLoading)}>
              Explain Code
            </button>
            <button 
              className="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
              onClick={() => handleBeautify(code, setOutput, setLoading)}>
              Indent Code
            </button>
            <button 
              className="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
              onClick={() => handleCopy(output, setCode)}>
              Copy to input
            </button>
            <button 
              className="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
              onClick={handleSave}>
              Save Entry
            </button>
          </div>
        </div>
        <div className="relative flex flex-col items-center">
          <textarea 
            value={loading ? 'Loading...' : output} 
            readOnly 
            rows="11" 
            className="resize-none p-4 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full max-w-4xl"
          />
          <MdContentCopy 
            className="absolute top-4 right-36 text-2xl cursor-pointer text-gray-500 hover:text-gray-600 hover:scale-105 transition-transform duration-200" 
            onClick={() => handleCopytoClipboard(output)} 
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
