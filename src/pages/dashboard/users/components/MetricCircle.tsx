import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts';

interface MetricCircleProps {
    name: string;
    score: number;
}

export function MetricCircle({ name, score }: MetricCircleProps) {
    const chartData = [
        {
            name,
            value: score,
            fill: 'url(#colorGradient)',
        },
    ];

    return (
        <div className="flex flex-col items-center gap-3">
            <div className="relative w-28 h-28">
                <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart
                        cx="50%"
                        cy="50%"
                        innerRadius="70%"
                        outerRadius="100%"
                        data={chartData}
                        startAngle={90}
                        endAngle={-270}
                    >
                        <defs>
                            <linearGradient id="colorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#E30BEB" />
                                <stop offset="100%" stopColor="#1869CC" />
                            </linearGradient>
                        </defs>
                        <PolarAngleAxis type="number" domain={[0, 10]} angleAxisId={0} tick={false} />
                        <RadialBar background={{ fill: '#D0D0D0' }} dataKey="value" cornerRadius={8} angleAxisId={0} />
                    </RadialBarChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <div className="text-lg font-bold text-[#000000]">{score.toFixed(1)}/10</div>
                    </div>
                </div>
            </div>
            <p className="text-xs text-[#2F2F2F] text-center max-w-24 text-nowrap">{name}</p>
        </div>
    );
}