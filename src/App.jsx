import {
  BrowserRouter, Routes, Route, NavLink,
} from 'react-router-dom';

import { createRoot } from 'react-dom/client';
import React from 'react';

function Nav() {
  return (
    <nav>
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/test/id1">Test ID1</NavLink></li>
        <li><NavLink to="/test/id2">Test ID2</NavLink></li>
      </ul>
    </nav>
  );
}

function Welcome() {
  return <div>Welcome</div>;
}

function About() {
  return <div>All there is to know about me</div>;
}
function Test() {
  return <div>Test</div>;
}

function FallBack() {
  return <div>URL Not Found</div>;
}

function App() {
  return (
    <BrowserRouter>
      <div>
        <Nav />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/about" element={<About />} />
          <Route path="/test/:id" element={<Test />} />
          <Route path="*" element={<FallBack />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

const root = createRoot(document.getElementById('main'));
root.render(<App />);
