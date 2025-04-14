import React from 'react';
import ReactDOM from 'react-dom/client';  // Make sure to import from 'react-dom/client'

import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);  // Ensure proper type
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
