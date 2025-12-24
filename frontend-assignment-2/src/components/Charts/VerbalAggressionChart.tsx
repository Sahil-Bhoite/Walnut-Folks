import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { VerbalAggressionData } from '../../data/mockData';
import { Edit2 } from 'lucide-react'; // Need to install lucide-react or use simple icon

interface VerbalAggressionChartProps {
    data: VerbalAggressionData[];
    onEdit: () => void;
}

const VerbalAggressionChart: React.FC<VerbalAggressionChartProps> = ({ data, onEdit }) => {
    return (
        <div className="glass-card p-6 flex flex-col h-full relative group hover:shadow-glow transition-all duration-500">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-white">Verbal Aggression</h3>
                    <p className="text-sm text-text-muted">Sentiment analysis breakdown</p>
                </div>
                <button
                    onClick={onEdit}
                    className="text-xs flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-primary border border-primary/20 transition-all font-medium"
                >
                    <span>Edit Data</span>
                </button>
            </div>

            <div className="flex-1 flex items-center justify-center min-h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{ backgroundColor: '#14162B', borderColor: '#2a2a3e', borderRadius: '12px' }}
                            itemStyle={{ color: '#fff' }}
                        />
                    </PieChart>
                </ResponsiveContainer>

                {/* Legend */}
                <div className="absolute bottom-6 left-6 flex flex-col gap-2">
                    {data.map((item) => (
                        <div key={item.status} className="flex items-center gap-2 text-xs text-text-muted">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                            <span>{item.status} ({item.value}%)</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VerbalAggressionChart;
