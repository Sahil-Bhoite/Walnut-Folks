import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { callerIdData } from '../../data/mockData';

const CallerIdChart: React.FC = () => {
    return (
        <div className="glass-card p-6 flex flex-col h-full hover:shadow-glow transition-all duration-500">
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-white">Caller ID Issues</h3>
                <p className="text-sm text-text-muted">Identification failure categories</p>
            </div>

            <div className="flex-1 min-h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={callerIdData} layout="vertical" margin={{ left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3e" horizontal={false} />
                        <XAxis type="number" hide />
                        <YAxis
                            dataKey="issue"
                            type="category"
                            stroke="#9AA0B5"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            width={110}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#14162B', borderColor: '#2a2a3e', borderRadius: '12px' }}
                            itemStyle={{ color: '#fff' }}
                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                        />
                        <Bar dataKey="count" fill="#FFB86C" radius={[0, 4, 4, 0]} barSize={20} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default CallerIdChart;
