import React from 'react'
import ReactDOM from 'react-dom'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import homeReducer from './features/home/homeSlice'

import './index.css'
import App from './App'

// доступ к состоянию редакса
const store = configureStore({
  reducer: {
    home: homeReducer,
  },
})

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>,
  // </React.StrictMode>
  document.getElementById('root')
)
