import React from 'react';

interface EditDataModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: any[]) => void;
    data: any[];
}

const EditDataModal: React.FC<EditDataModalProps> = ({
    isOpen,
    onClose,
    onSave,
    data,
}) => {
    const [localData, setLocalData] = useState<any[]>(data);

    if (!isOpen) return null;

    const handleChange = (index: number, value: string) => {
        const newData = [...localData];
        newData[index] = { ...newData[index], value: Number(value) };
        setLocalData(newData);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="bg-[#1A1C2E] border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
                <h2 className="text-xl font-bold text-white mb-2">Edit Chart Data</h2>
                <p className="text-text-muted mb-8">
                    Adjust the percentages for Verbal Aggression Analysis.
                </p>

                <div className="space-y-6 mb-8">
                    {localData.map((item, index) => (
                        <div key={item.status} className="flex items-center gap-4">
                            <div className="flex items-center gap-3 w-40 shrink-0">
                                <div className="w-3 h-3 rounded-full shrink-0 shadow-lg" style={{ backgroundColor: item.color }} />
                                <div className="text-white font-medium text-sm">{item.status}</div>
                            </div>
                            <div className="relative flex-1">
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={item.value}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    className="w-full bg-[#14162B] border border-white/10 rounded-lg pl-4 pr-10 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-mono text-base shadow-inner"
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted font-medium pointer-events-none">%</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex gap-4 pt-2">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-3.5 rounded-xl border border-white/10 text-text-muted hover:text-white hover:bg-white/5 transition-all font-medium text-sm"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onSave(localData)}
                        className="flex-1 px-4 py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold transition-all shadow-lg shadow-primary/25 text-sm"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

import { useState } from 'react'; // Add missing import
export default EditDataModal;
