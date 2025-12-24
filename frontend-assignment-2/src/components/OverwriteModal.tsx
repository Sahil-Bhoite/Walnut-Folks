import React, { useState } from 'react';
import { VerbalAggressionData } from '../data/mockData';

interface OverwriteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    oldData: VerbalAggressionData[];
    newData: VerbalAggressionData[];
}

const OverwriteModal: React.FC<OverwriteModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#1A1C2E] border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl">
                <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center mb-4 text-yellow-500 text-2xl">
                    ⚠️
                </div>
                <h2 className="text-xl font-bold text-white mb-2">Previous Data Found</h2>
                <p className="text-text-muted mb-6">
                    We found existing chart values associated with this email. Do you want to overwrite them with your new changes?
                </p>

                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-3 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-all font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 px-4 py-3 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold transition-all shadow-lg shadow-primary/25"
                    >
                        Overwrite
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OverwriteModal;
