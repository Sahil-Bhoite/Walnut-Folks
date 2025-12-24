import React from 'react';

export const Header: React.FC = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5 h-16 transition-all">
            <div className="container mx-auto px-6 h-full flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-3 group cursor-pointer">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold text-white text-lg shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
                        V
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white group-hover:text-primary-hover transition-colors">
                        Voice<span className="text-primary">Analytics</span>
                    </span>
                </div>

                {/* Links */}
                <div className="hidden md:flex items-center gap-8">
                    {['Overview', 'Analytics', 'FAQ'].map((link) => (
                        <a
                            key={link}
                            href={`#${link.toLowerCase()}`}
                            className="text-sm font-medium text-text-muted hover:text-white transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full"
                        >
                            {link}
                        </a>
                    ))}
                </div>

                {/* CTA */}
                <button className="bg-white/10 hover:bg-white/15 hover:border-white/20 border border-white/10 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-all backdrop-blur-sm active:scale-95">
                    Book a Demo
                </button>
            </div>
        </nav>
    );
};

export const Hero: React.FC = () => {
    return (
        <section className="pt-40 pb-20 px-6 relative overflow-hidden flex flex-col items-center justify-center min-h-[60vh]">
            {/* Background Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto max-w-5xl text-center relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-primary text-xs font-semibold uppercase tracking-wider mb-8 backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                    Live Production Analytics
                </div>

                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-8 leading-[1.1] drop-shadow-2xl">
                    Your voice agents pass every test. <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-300% animate-gradient">
                        Then they fail real customers.
                    </span>
                </h1>

                <p className="text-xl text-text-muted mb-12 max-w-2xl mx-auto leading-relaxed">
                    The only platform that visualizes production gaps, verbal aggression, and identity handling failures in real-time.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                    <a
                        href="#analytics"
                        className="w-full sm:w-auto bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 active:scale-95 flex items-center justify-center gap-2"
                    >
                        view Analytics <span className="text-xl">↓</span>
                    </a>
                    <button className="w-full sm:w-auto bg-background-secondary hover:bg-white/5 border border-white/10 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all active:scale-95">
                        How it Works
                    </button>
                </div>
            </div>
        </section>
    );
};

export const Footer: React.FC = () => {
    return (
        <footer className="border-t border-white/5 py-16 mt-20 bg-background-secondary/30 backdrop-blur-lg">
            <div className="container mx-auto px-6 text-center">
                <div className="flex justify-center items-center gap-2 mb-6 opacity-50">
                    <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center text-white text-xs font-bold">V</div>
                    <span className="font-bold text-white">VoiceAnalytics</span>
                </div>
                <p className="text-text-muted text-sm max-w-md mx-auto leading-relaxed">
                    © 2026 VoiceAnalytics. Example dashboard built for WFG Assessment. <br />
                    <span className="opacity-50">Deployed on Vercel.</span>
                </p>
            </div>
        </footer>
    );
};
