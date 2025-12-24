import React from 'react';
import './Header.css';

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="header-container">
                <div className="logo">
                    <span className="logo-icon">*</span>
                    <span className="logo-text">Voice<span className="gradient-text">Analytics</span></span>
                </div>

                <nav className="nav">
                    <a href="#dashboard" className="nav-link">Dashboard</a>
                    <a href="#charts" className="nav-link">Charts</a>
                    <a href="#analytics" className="nav-link">Analytics</a>
                </nav>

                <button className="cta-button">
                    Book a Demo
                </button>
            </div>
        </header>
    );
};

export default Header;
