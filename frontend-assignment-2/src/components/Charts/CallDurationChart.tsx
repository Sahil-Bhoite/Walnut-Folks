import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { callDurationData } from '../../data/mockData';

const CallDurationChart: React.FC = () => {
    return (
        <div className="glass-card p-6 flex flex-col h-full hover:shadow-glow transition-all duration-500">
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-white">Call Duration Analysis</h3>
                <p className="text-sm text-text-muted">Distribution of call lengths across all interactions</p>
            </div>

            <div className="flex-1 min-h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={callDurationData}>
                        <defs>
                            <linearGradient id="durationGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#7C5CFF" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#7C5CFF" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3e" vertical={false} />
                        <XAxis
                            dataKey="range"
                            stroke="#6b6b7b"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            dy={10}
                        />
                        <YAxis
                            stroke="#6b6b7b"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            dx={-10}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#14162B', borderColor: '#2a2a3e', borderRadius: '12px' }}
                            itemStyle={{ color: '#fff' }}
                            cursor={{ stroke: '#7C5CFF', strokeWidth: 1, strokeDasharray: '4 4' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="calls"
                            stroke="#7C5CFF"
                            strokeWidth={3}
                            fill="url(#durationGradient)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default CallDurationChart;
