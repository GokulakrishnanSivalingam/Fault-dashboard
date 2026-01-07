import React from 'react';
import './AboutPage.css';

const AboutPage = () => {
    return (
        <div className="about-container">
            <div className="about-card">
                <h1 className="about-title">About the Project</h1>

                <div className="about-content">
                    <p>
                        This project, <strong className="about-highlight">Transformer Line Detection with MERN & ML</strong>, represents a leap forward in electrical infrastructure monitoring.
                    </p>

                    <div className="about-grid">
                        <div className="about-box blue">
                            <h3 className="about-box-title">Our Mission</h3>
                            <p className="text-sm">To reduce electrical failures and improve grid reliability through accessible, high-tech monitoring solutions.</p>
                        </div>
                        <div className="about-box purple">
                            <h3 className="about-box-title">The Tech Stack</h3>
                            <p className="text-sm">Built on MongoDB, Express, React, Node.js, and Python-based Machine Learning integration.</p>
                        </div>
                    </div>

                    <h2 className="about-subtitle">How it Works</h2>
                    <ul className="about-list">
                        <li>Hardware sensors collect raw voltage and thermal data.</li>
                        <li>ML algorithms process data to identify anomaly patterns.</li>
                        <li>The MERN dashboard visualizes this data for operators in real-time.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
