import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-brand">
                    <span className="logo-icon">*</span>
                    <span className="logo-text">Voice<span className="gradient-text">Analytics</span></span>
                </div>
                <div className="footer-links">
                    <a href="#dashboard">Dashboard</a>
                    <a href="#charts">Charts</a>
                    <a href="#analytics">Analytics</a>
                </div>
                <div className="footer-copyright">
                    2024 VoiceAnalytics. Built for WFG Assessment.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
