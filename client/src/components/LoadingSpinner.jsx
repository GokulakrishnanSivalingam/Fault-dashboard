import React from 'react';
import './Loader.css';

const LoadingSpinner = () => {
    return (
        <div className="loader-container">
            <span className="spinner"></span>
            <p className="loading-text">Initializing System...</p>
        </div>
    );
};

export default LoadingSpinner;
