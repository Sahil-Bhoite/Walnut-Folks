import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { languageSupportData } from '../../data/mockData';

const LanguageSupportChart: React.FC = () => {
    return (
        <div className="glass-card p-6 flex flex-col h-full hover:shadow-glow transition-all duration-500">
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-white">Language Failures</h3>
                <p className="text-sm text-text-muted">Unsupported language detection</p>
            </div>

            <div className="flex-1 min-h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={languageSupportData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3e" vertical={false} />
                        <XAxis
                            dataKey="language"
                            stroke="#6b6b7b"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            dy={10}
                        />
                        <YAxis hide />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#14162B', borderColor: '#2a2a3e', borderRadius: '12px' }}
                            itemStyle={{ color: '#fff' }}
                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                        />
                        <Bar dataKey="count" fill="#FF6B6B" radius={[4, 4, 0, 0]} barSize={40} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default LanguageSupportChart;
