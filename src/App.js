import React from 'react';
import { Route, Routes} from "react-router-dom";
import './App.css';
import Register from './pages/Register';

const App = () => (
  <div className="App">
    <Routes>
      <Route path="/" element={<Register/>}/>
    </Routes>
  </div>
);

export default App;