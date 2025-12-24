import React, { useState } from 'react';

interface EmailModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (email: string) => void;
}

const EmailModal: React.FC<EmailModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            setError('Please enter a valid email');
            return;
        }
        onSubmit(email);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#1A1C2E] border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
                <h2 className="text-2xl font-bold text-white mb-2">Enter your email</h2>
                <p className="text-text-muted mb-6">
                    We need your email to verify you're not a robot and to save your custom chart data.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setError('');
                            }}
                            placeholder="name@company.com"
                            className="w-full bg-[#14162B] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-text-muted focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                            autoFocus
                        />
                        {error && <p className="text-[#FF6B6B] text-sm mt-2">{error}</p>}
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-3 rounded-xl border border-white/10 text-text-muted hover:text-white hover:bg-white/5 transition-all font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-3 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold transition-all shadow-lg shadow-primary/25"
                        >
                            Continue
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EmailModal;
