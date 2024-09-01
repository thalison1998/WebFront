import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../views/Login/Login';
import About from '../views/About';

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </Router>
);

export default AppRouter;

