import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Routes } from "./Routes";
import { getMonitoring } from "./features/home/homeSlice";

// import './App.css'

import "@brainhubeu/react-carousel/lib/style.css";
import "./main.css";
import "antd/dist/antd.css";

function App() {
 const dispatch = useDispatch();

 useEffect(() => {
  dispatch(getMonitoring());
 }, []);

 return (
  <Router basename="/">
   <Routes />
  </Router>
 );
}

export default App;
