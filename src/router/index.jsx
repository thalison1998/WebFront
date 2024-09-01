import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../views/login/Login';
import Home from '../views/home/Home';
import ProtectedRoute from './protectedRoute';
import { Navigate } from 'react-router-dom';

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/home" element={<ProtectedRoute element={<Home />} redirect={<Navigate to="/" />} />} />
  </Routes>
);

export default AppRouter;