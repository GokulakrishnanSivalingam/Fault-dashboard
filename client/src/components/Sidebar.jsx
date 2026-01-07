import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Home, Info, Activity, Menu, X } from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const navItems = [
        { path: '/', label: 'Home', icon: <Home size={20} /> },
        { path: '/analysis', label: 'Analysis Dashboard', icon: <Activity size={20} /> },
        { path: '/about', label: 'About Us', icon: <Info size={20} /> },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            <div
                className={`sidebar-overlay ${isOpen ? 'visible' : ''}`}
                onClick={toggleSidebar}
            ></div>

            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <h1 className="brand-title">
                        LineGuard AI
                    </h1>
                    <button className="close-btn" onClick={toggleSidebar}>
                        <X size={24} />
                    </button>
                </div>
                <nav className="sidebar-nav">
                    <ul className="nav-list">
                        {navItems.map((item) => (
                            <li key={item.path}>
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `nav-link ${isActive ? 'active' : ''}`
                                    }
                                    onClick={() => window.innerWidth < 768 && toggleSidebar()}
                                >
                                    {item.icon}
                                    <span className="nav-text">{item.label}</span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="sidebar-footer">
                    <p>v1.3.0 • Online</p>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
