import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Start from '../components/Start';
import USMapChart from '../components/USMap';
import Language from '../components/Language';
import DailyReport from '../components/DailyReport';
import UpdatingBar from '../components/UpdatingBar';
import Test from '../components/Test';




const AppRoutes = () => {
    return (
      <Routes>
        <Route path="/"  element={<Start />} />
        <Route path="/home" element={<USMapChart />} />
        <Route path="/language" element={<Language />} />
        <Route path="/daily" element={<DailyReport />} />
        <Route path="/update" element={<UpdatingBar />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    );
  };

export default AppRoutes;
