import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage';
import CompileCode from './pages/CompileCode';
import CodeAssistant from './pages/CodeAssistant';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<CodeAssistant />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/compile" element={<CompileCode />} />
      </Routes>
    </Router>
  );
}

export default App;
