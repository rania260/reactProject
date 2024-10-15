import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import React from 'react';
import 'jsvectormap';
import 'flatpickr';
import './styles/satoshi.css';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <App />
      <ToastContainer />
  </React.StrictMode>,
)
