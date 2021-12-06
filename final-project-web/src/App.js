import React from 'react';
import {BrowserRouter as Router, Routes,Route, Navigate, Redirect} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

import Login from "./containers/auth/login";
import Register from "./containers/auth/register";
import Home from './containers/home';

import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.withCredentials = true; //to generate csrf token
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(function(config){
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
})


function App() {
  return (
    <Router>
      <Routes>
        {/*<Route path="/" element={<Login />} />
        <Route path="/register"  element={<Register />}/>*/}

        <Route path="/" element={<Login/>} render={localStorage.getItem('auth_token') ? <Navigate to='/home' /> : <Login />} />

        <Route path="/register" element={<Register/>} render={localStorage.getItem('auth_token') ? <Navigate to='/home' /> : <Register/>} />

        <Route path="/home" element={<Home/>} />
      </Routes>
    </Router>
    
  );
}

export default App;
