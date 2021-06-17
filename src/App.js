import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Routes } from "./Routes";
import { getMonitoring, getConfig } from "./features/home/homeSlice";

// import './App.css'

import "@brainhubeu/react-carousel/lib/style.css";
import "./main.css";
import "antd/dist/antd.css";

function App() {
 const dispatch = useDispatch();
 const {config} = useSelector(state => state.home)

 useEffect(() => {
   dispatch(getConfig());
 }, []);

 useEffect(() => {

  if(config){
   dispatch(getMonitoring({config}));
  }
 }, [config]);

 return (
  <Router basename="/sc-districts/v2/">
   <Routes />
  </Router>
 );
}

export default App;
