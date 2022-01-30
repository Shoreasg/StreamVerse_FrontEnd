import React, { useContext } from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import './App.less';
import { AuthContext } from './context/AuthContextProvider';
import Faq from './pages/Faq';
import Home from './pages/Home';
import Register from './pages/Register';
import Profile from './pages/Profile';

const App = () => {

  const userSession = useContext(AuthContext)
  console.log(userSession)

  return (<div className="App">
    <Routes>
      {userSession ? <>
        <Route path="*" element={<Navigate to="/home" />}  />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </> :

        <>
          <Route path="*" element={<Navigate to="/register" />}  />
          <Route path="/register" element={<Register />} />
          <Route path="/faq" element={<Faq />} />
        </>}

    </Routes>
  </div>
  );
}


export default App;