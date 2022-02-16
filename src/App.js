import React, { useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes, Navigate } from "react-router-dom";
import './App.less';
import { AuthContext } from './context/AuthContextProvider';
import Faq from './pages/Faq';
import Home from './pages/Home';
import Register from './pages/Register';
import Profile from './pages/Profile';
import PageHeader from "./components/PageHeader";
import OtherUserProfile from './pages/OtherUserProfile';

const App = () => {

  const userSession = useContext(AuthContext)
  console.log(userSession)

  return (<div className="App">
        <ToastContainer />
      {userSession ?
        <>
          <PageHeader />
          <Routes>
          <Route path="home" element={<Home userName={userSession.userName} TwitchId={userSession.twitchId} profileImage={userSession.profileImage}/>} />
          <Route path="profile" element={<Profile userName={userSession.userName} TwitchId={userSession.twitchId} profileImage={userSession.profileImage}/>} />
          <Route path="profile/:id" element={<OtherUserProfile/>} />
          <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
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