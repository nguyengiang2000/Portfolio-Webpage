import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client';
import React from 'react';
import App from './App.jsx'

const root = ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
