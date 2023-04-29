import React,{Suspense,Component,lazy,useState,useEffect} from 'react';
import {HashRouter,Route,Routes} from 'react-router-dom';
import Home from '@/routers/Home';
import Login from '@/routers/Login';
import User from '@/routers/User';
import UserInfo from '@/routers/User/userInfo';
import ArticleCate from '@/routers/Article/article_cate';
import ArticleCateInfo from '@/routers/Article/article_cate_info';
import Article from '@/routers/Article/article_list';
import ArticleInfo from '@/routers/Article/article_info';
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
            <Route path="/home/article_cate/list" element={<ArticleCate />} ></Route>
            <Route path="/home/article_cate/:id" element={<ArticleCateInfo />} ></Route>
            <Route path="/home/article_cate/add" element={<ArticleCateInfo />} ></Route>
            <Route path="/home/article/list" element={<Article />} ></Route>
            <Route path="/home/article/:id" element={<ArticleInfo />} ></Route>
            <Route path="/home/article/add" element={<ArticleInfo />} ></Route>
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
