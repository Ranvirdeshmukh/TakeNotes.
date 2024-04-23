import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // Make sure this path is correct and points to App.jsx
import './App.css'; // Ensure you have your styles if needed

const container = document.getElementById('root'); // Ensure there's a div with id 'root' in your index.html
const root = createRoot(container);

root.render(<App />);
