import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // Make sure this path is correct and points to App.jsx
import './App.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App />);
