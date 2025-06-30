import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import StackPage from './layouts/StackPage';
import QueuePage from './layouts/QueuePage';
import LinkedListPage from './layouts/LinkedListPage';
import TreePage from './layouts/TreePage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="navbar">
        <h1 className="logo">Visualise DSA</h1>
        <nav>
          <NavLink to="/stack" className="nav-link">Stack</NavLink>
          <NavLink to="/queue" className="nav-link">Queue</NavLink>
          <NavLink to="/linkedlist" className="nav-link">Linked List</NavLink>
          <NavLink to="/tree" className="nav-link">Tree</NavLink>
        </nav>
      </div>

      <Routes>
        <Route path="/stack" element={<StackPage />} />
        <Route path="/queue" element={<QueuePage />} />
        <Route path="/linkedlist" element={<LinkedListPage />} />
        <Route path="/tree" element={<TreePage />} />
        <Route path="*" element={<StackPage />} />
      </Routes>
    </Router>
  );
}

export default App;
