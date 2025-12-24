import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts';
import { callVolumeData } from '../../data/mockData';
import './ChartCard.css';

const CallVolumeChart: React.FC = () => {
    return (
        <div className="chart-card">
            <div className="chart-header">
                <h3 className="chart-title">Call Volume</h3>
                <span className="chart-subtitle">Weekly call distribution</span>
            </div>

            <div className="chart-container">
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={callVolumeData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3e" />
                        <XAxis
                            dataKey="day"
                            stroke="#6b6b7b"
                            fontSize={12}
                            tickLine={false}
                        />
                        <YAxis
                            stroke="#6b6b7b"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <Tooltip
                            contentStyle={{
                                background: '#1a1a2e',
                                border: '1px solid #2a2a3e',
                                borderRadius: '8px',
                                color: '#fff',
                            }}
                        />
                        <Legend
                            wrapperStyle={{ color: '#a0a0b0' }}
                        />
                        <Bar
                            dataKey="calls"
                            name="Total Calls"
                            fill="#8b5cf6"
                            radius={[4, 4, 0, 0]}
                        />
                        <Bar
                            dataKey="successful"
                            name="Successful"
                            fill="#22c55e"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default CallVolumeChart;
