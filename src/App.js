import React, { useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes, Navigate } from "react-router-dom";
import './App.less';
import { AuthContext } from './context/AuthContextProvider';
import Faq from './pages/Faq';
import Home from './pages/Home';
import Register from './pages/Register';
import PageHeader from "./components/PageHeader";
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import PageFooter from './components/PageFooter';

const App = () => {

  const userSession = useContext(AuthContext)

  return (<div className="App">
    <ToastContainer />
    {userSession ?
      <>
        <PageHeader />
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="Dashboard" element={<Dashboard />} />
          <Route path="profile/:id" element={<Profile />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
        <PageFooter />
      </> :
      <>
        <Routes>
          <Route path="register" element={<Register />} />
          <Route path="faq" element={<Faq />} />
          <Route path="*" element={<Navigate to="/register" />} />
        </Routes>

      </>}
  </div>
  );
}


export default App;