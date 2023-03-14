import React,{Suspense,Component,lazy,useState,useEffect} from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from '@/routers/Home'
import Login from '@/routers/Login'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} ></Route>
        <Route path="/login" element={<Login />} ></Route>
        <Route path="/home" element={<Home />} ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
