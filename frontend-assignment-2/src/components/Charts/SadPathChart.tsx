import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from 'recharts';
import { sadPathData } from '../../data/mockData';

const SadPathChart: React.FC = () => {
    return (
        <div className="glass-card p-6 flex flex-col h-full hover:shadow-glow transition-all duration-500">
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-white">Sad Path Analysis</h3>
                <p className="text-sm text-text-muted">Top reasons for failed or problematic calls</p>
            </div>

            <div className="flex-1 min-h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sadPathData} layout="vertical" margin={{ left: 40 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3e" horizontal={false} />
                        <XAxis type="number" hide />
                        <YAxis
                            dataKey="category"
                            type="category"
                            stroke="#9AA0B5"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            width={100}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#14162B', borderColor: '#2a2a3e', borderRadius: '12px' }}
                            itemStyle={{ color: '#fff' }}
                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                        />
                        <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={24}>
                            {sadPathData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#5ED3F3' : '#7C5CFF'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default SadPathChart;
