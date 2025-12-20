import { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Select, Card, Spin, Alert } from 'antd';
import { usePaymentGraph } from '../../../api/dashboardApi';

const { Option } = Select;

const TotalEarning = () => {
    const [selectedYear, setSelectedYear] = useState<string>('2025');

    // API call
    const { paymentGraph, isLoading, isError, error } = usePaymentGraph();

    const chartData = useMemo(() => {
        if (!paymentGraph) return [];

        return paymentGraph.map((item: any) => ({
            month: item.month_short,
            monthYear: item.month_year.split('-')[0] + ' ' + item.month_year.split('-')[1],
            value: item.amount,
        }));
    }, [paymentGraph]);

    return (
        <Card className="mb-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Aperçu de la croissance des utilisateurs du chat</h2>

                {/* <Select
                    value={selectedYear}
                    onChange={setSelectedYear}
                    className="w-24"
                >
                    <Option value="2023">2023</Option>
                    <Option value="2024">2024</Option>
                    <Option value="2025">2025</Option>
                </Select> */}
            </div>

            {/* 🔹 Chargement */}
            {isLoading && (
                <div className="flex justify-center items-center h-[300px]">
                    <Spin size="large" />
                </div>
            )}

            {/* 🔹 Erreur */}
            {isError && (
                <Alert
                    type="error"
                    message="Échec du chargement des données de revenus"
                    description={error?.message || 'Une erreur est survenue'}
                />
            )}

            {/* 🔹 Graphique */}
            {!isLoading && !isError && (
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />

                        <XAxis dataKey="month" stroke="#999" style={{ fontSize: '12px' }} />

                        <YAxis stroke="#999" style={{ fontSize: '12px' }} tickFormatter={(value) => `$${value}`} />

                        <Tooltip
                            labelFormatter={(label, payload) => {
                                if (payload && payload.length > 0) {
                                    return payload[0].payload.monthYear;
                                }
                                return label;
                            }}
                            contentStyle={{
                                backgroundColor: '#f5f5f5',
                                borderRadius: '8px',
                                border: 'none',
                            }}
                        />

                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#a855f7"
                            strokeWidth={2}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            )}
        </Card>
    );
};

export default TotalEarning;
