import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Outer } from './pages/Outer.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Outer/>
  </React.StrictMode>
);
