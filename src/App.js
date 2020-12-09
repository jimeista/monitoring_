import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import homeReducer from './features/home/homeSlice'
import { Routes } from './Routes'
import './App.css'
import 'antd/dist/antd.css'

const store = configureStore({
  reducer: {
    home: homeReducer,
  },
})

function App() {
  return (
    <Provider store={store}>
      <Router basename='/sc-districts/home'>
        <Routes />
      </Router>
    </Provider>
  )
}

export default App
