import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import RegisterClient from './pages/RegisterClient';
import RegisterAccountManager from './pages/registerAccountManager';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/registerClient' element={<RegisterClient />} />
        <Route path='/registerAccountManager' element={<RegisterAccountManager />} />
      </Routes>
    </Router>
  );
}

export default App;
