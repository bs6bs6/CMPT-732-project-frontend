import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Start from '../components/Start';
import USMapChart from '../components/USMap';
import Language from '../components/Language';
import DailyReport from '../components/DailyReport';

const AppRoutes = () => {
    return (
      <Routes>
        <Route path="/"  element={<Start />} />
        <Route path="/home" element={<USMapChart />} />
        <Route path="/language" element={<Language />} />
        <Route path="/daily" element={<DailyReport />} />


      </Routes>
    );
  };

export default AppRoutes;
