import React,{Suspense,Component,lazy,useState,useEffect} from 'react';
import {HashRouter,Route,Routes} from 'react-router-dom';
import Home from '@/routers/Home';
import Login from '@/routers/Login';
import User from '@/routers/User';
import UserInfo from '@/routers/User/userInfo';
import Overview from '@/routers/Overview';
function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} ></Route>
        <Route path="/login" element={<Login />} ></Route>
        <Route path="/home" element={<Home />} >
            <Route path="/home" element={<Overview />} ></Route>
            <Route path="/home/user" element={<User />} ></Route>
            <Route path="/home/user/:id" element={<UserInfo />} ></Route>
            <Route path="/home/user/list" element={<User />} ></Route>
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
