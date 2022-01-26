import React from 'react';
import { Route, Routes } from "react-router-dom";
import './App.less';
import Faq from './pages/Faq';
import Register from './pages/Register';

const App = () => (
  <div className="App">
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/faq" element={<Faq />} />
    </Routes>
  </div>
);

export default App;