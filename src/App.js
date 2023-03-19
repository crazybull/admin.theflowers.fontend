import React,{Suspense,Component,lazy,useState,useEffect} from 'react';
import {HashRouter,Route,Routes} from 'react-router-dom';
import Home from '@/routers/Home';
import Login from '@/routers/Login';
function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} ></Route>
        <Route path="/login" element={<Login />} ></Route>
        <Route path="/home" element={<Home />} ></Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
