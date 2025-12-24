import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts';
import { latencyData } from '../../data/mockData';
import './ChartCard.css';

const LatencyChart: React.FC = () => {
    return (
        <div className="chart-card latency-card">
            <div className="chart-header">
                <h3 className="chart-title">Latency Analysis</h3>
                <span className="chart-subtitle">STT / LLM / TTS breakdown (ms)</span>
            </div>

            <div className="chart-container">
                <ResponsiveContainer width="100%" height={280}>
                    <AreaChart data={latencyData}>
                        <defs>
                            <linearGradient id="sttGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="llmGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="ttsGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3e" />
                        <XAxis
                            dataKey="time"
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
                            formatter={(value: number) => [`${value}ms`, '']}
                        />
                        <Legend
                            wrapperStyle={{ color: '#a0a0b0' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="stt"
                            name="STT"
                            stackId="1"
                            stroke="#8b5cf6"
                            fill="url(#sttGradient)"
                        />
                        <Area
                            type="monotone"
                            dataKey="llm"
                            name="LLM"
                            stackId="1"
                            stroke="#3b82f6"
                            fill="url(#llmGradient)"
                        />
                        <Area
                            type="monotone"
                            dataKey="tts"
                            name="TTS"
                            stackId="1"
                            stroke="#22c55e"
                            fill="url(#ttsGradient)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default LatencyChart;
