import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

import Home from './pages/Home';
import Login from './pages/Login';
import RegisterClient from './pages/RegisterClient';
import RegisterAccountManager from './pages/RegisterAccountManager';

import { Portal } from './pages/Portal';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />} />

        <Route path='/login' element={<Login />} />
        <Route path='/register/client' element={<RegisterClient />} />
        <Route path='/register/accountmanager' element={<RegisterAccountManager />} />

        <Route path='/portal' element={<Portal />} />
      
      </Routes>
    </Router>
  );
}

export default App;
