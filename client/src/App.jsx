import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import './App.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="app-container">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <div className="main-content">
          <button
            className="mobile-menu-btn"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/analysis" element={<Dashboard />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<div className="page-not-found">Page not found</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
