import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import { Routes } from './Routes'
import './App.css'
import 'antd/dist/antd.css'

function App() {
  return (
    <Router>
      <Routes />
    </Router>
  )
}

export default App
