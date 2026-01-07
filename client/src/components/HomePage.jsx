import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Zap, Activity } from 'lucide-react';
import './HomePage.css';

const HomePage = () => {
    return (
        <div className="home-container">
            {/* Hero Section */}
            <header className="hero">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <div className="hero-badge">
                        Next-Gen Hardware Protection
                    </div>
                    <h1 className="hero-title">
                        Intelligent <span className="hero-highlight">Transformer Line</span> <br />
                        Detection System
                    </h1>
                    <p className="hero-desc">
                        Real-time monitoring powered by Machine Learning. Detect faults, track voltage anomalies, and prevent failures before they happen.
                    </p>
                    <Link to="/analysis" className="hero-btn">
                        View Live Dashboard <ArrowRight size={20} />
                    </Link>
                </div>
            </header>

            {/* Features Grid */}
            <div className="features-section">
                <h2 className="features-title">Why Choose LineGuard?</h2>
                <div className="features-grid">
                    <FeatureCard
                        icon={<Zap color="#eab308" size={32} />}
                        title="Real-Time Voltage"
                        desc="Instant tracking of voltage fluctuations with millisecond precision."
                    />
                    <FeatureCard
                        icon={<Activity color="#ef4444" size={32} />}
                        title="Fault Detection"
                        desc="AI-driven algorithms identify critical line faults instantly."
                    />
                    <FeatureCard
                        icon={<Shield color="#22c55e" size={32} />}
                        title="Predictive Safety"
                        desc="Advanced ML models forecast component fatigue and risks."
                    />
                </div>
            </div>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc }) => (
    <div className="feature-card">
        <div className="feature-icon-wrapper">
            {icon}
        </div>
        <h3 className="feature-card-title">{title}</h3>
        <p className="feature-card-desc">{desc}</p>
    </div>
);

export default HomePage;
