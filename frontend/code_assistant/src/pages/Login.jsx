import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/v1/auth/login', { email, password });

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      const token = response.data.token;
      const userId=response.data.userId;
      localStorage.setItem('token', token);
      localStorage.setItem('userId',userId);
      navigate('/success');
    } catch (error) {
      alert('Login failed');
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      <h1 className="pl-4 pt-10 mb-4 text-2xl font-bold font-sans text-gray-900 dark:text-black md:text-5xl lg:text-6xl flex justify-center">
        Code Assistant
      </h1>
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div>
          <label className="block mb-1 text-gray-700 font-bold" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-700 font-bold" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter your password"
          />
        </div>
        <br></br>
        <Link to='/signup' className="link link-hover">{"Don't"} have an account?</Link>
        <div className="flex justify-center">
          <button
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            onClick={handleLogin}
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
