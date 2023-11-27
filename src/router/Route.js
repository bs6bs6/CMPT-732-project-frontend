import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Start from '../components/Start';
import USMapChart from '../components/USMap';

const AppRoutes = () => {
    return (
      <Routes>
        <Route path="/"  element={<Start />} />
        <Route path="/home" element={<USMapChart />} />
        <Route path="/about" element={<USMapChart />} />

      </Routes>
    );
  };

export default AppRoutes;
