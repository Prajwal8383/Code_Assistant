import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CompileCode from './pages/CompileCode';
import CodeAssistant from './pages/CodeAssistant';
import Login from './pages/Login';
import Signup from './pages/Signup';
import LoginSuccess from './pages/LoginSuccess';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<CodeAssistant />} />
        
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={ <Signup />}/>
        <Route path='/success' element={<LoginSuccess />}/>

        <Route path="/home" element={<HomePage />} />
        <Route path="/compile" element={<CompileCode />} />
      </Routes>
    </Router>
  );
}

export default App;
