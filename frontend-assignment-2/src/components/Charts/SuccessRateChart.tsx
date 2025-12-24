import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { successRateData } from '../../data/mockData';
import './ChartCard.css';

const SuccessRateChart: React.FC = () => {
    return (
        <div className="chart-card">
            <div className="chart-header">
                <h3 className="chart-title">Success Rate Trend</h3>
                <span className="chart-subtitle">Weekly success rate percentage</span>
            </div>

            <div className="chart-container">
                <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={successRateData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3e" />
                        <XAxis
                            dataKey="date"
                            stroke="#6b6b7b"
                            fontSize={12}
                            tickLine={false}
                        />
                        <YAxis
                            stroke="#6b6b7b"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            domain={[80, 95]}
                        />
                        <Tooltip
                            contentStyle={{
                                background: '#1a1a2e',
                                border: '1px solid #2a2a3e',
                                borderRadius: '8px',
                                color: '#fff',
                            }}
                            formatter={(value: number) => [`${value}%`, 'Success Rate']}
                        />
                        <Line
                            type="monotone"
                            dataKey="rate"
                            stroke="#22c55e"
                            strokeWidth={2}
                            dot={{ fill: '#22c55e', strokeWidth: 2 }}
                            activeDot={{ r: 6, fill: '#22c55e' }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default SuccessRateChart;
