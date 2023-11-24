import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../components/Home';
import Start from '../components/Start';
const AppRoutes = () => {
    return (
      <Routes>
        <Route path="/"  element={<Start />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    );
  };

export default AppRoutes;
