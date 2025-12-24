import React from 'react';
import { summaryStats } from '../data/mockData';
import './Hero.css';

const Hero: React.FC = () => {
    return (
        <section className="hero">
            <div className="hero-container">
                <div className="hero-badge">VOICE AI ANALYTICS PLATFORM</div>

                <h1 className="hero-title">
                    Your voice agents work in the demo.
                    <br />
                    <span className="gradient-text">Track them</span> in production.
                </h1>

                <p className="hero-subtitle">
                    VoiceAnalytics is the call analytics platform that helps you understand
                    how your voice agents perform with real customers.
                </p>

                <div className="hero-stats">
                    <div className="stat-card">
                        <div className="stat-value">{summaryStats.totalCalls.toLocaleString()}</div>
                        <div className="stat-label">Total Calls</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-value">{summaryStats.avgDuration}</div>
                        <div className="stat-label">Avg Duration</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-value">{summaryStats.successRate}%</div>
                        <div className="stat-label">Success Rate</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-value">{summaryStats.avgLatency}ms</div>
                        <div className="stat-label">Avg Latency</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
