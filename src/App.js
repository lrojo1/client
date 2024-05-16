import React from 'react';
import Loading from './components/Loading';
import NavBar from './components/NavBar';
import Notification from './components/Notification';
import Login from './components/user/Login';
//import AddLocation from './components/addEvent/addLocation/AddLocation.js';
import BottomNav from './components/BottomNav.js';

const App = () => {
  return (
    <>
      <Loading />
      <Notification />
      <Login />
      <NavBar />
      <BottomNav/>
      

    </>
  );
};

export default App;