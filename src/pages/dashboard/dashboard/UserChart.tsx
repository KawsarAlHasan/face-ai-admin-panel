import { Card, Select, Spin } from 'antd';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Legend, Bar } from 'recharts';
import { useUserGraph } from '../../../api/dashboardApi';

const { Option } = Select;

const UserChart = () => {
    const { userGraph, isLoading, isError, error } = useUserGraph();

    // 🔹 Données API → format Recharts
    const chartData =
        userGraph?.map((item: any) => ({
            month: item.month_short,
            monthYear: item.month_year.split('-')[0] + ' ' + item.month_year.split('-')[1],
            totalUsers: item.count,
        })) || [];

    if (isLoading) {
        return (
            <Card className="mb-6 rounded-lg">
                <Spin />
            </Card>
        );
    }

    if (isError) {
        return <Card className="mb-6 rounded-lg text-red-500">{error?.message || 'Une erreur est survenue'}</Card>;
    }

    return (
        <Card className="mb-6 rounded-lg shadow-sm border border-gray-200">
            <div className="px-2 flex items-center justify-between mb-4">
                <h1 className="text-xl font-medium">Statistiques du nombre total d’utilisateurs</h1>

                {/* <Select defaultValue="2025" className="w-32 h-[40px]">
                    <Option value="2024">2024</Option>
                    <Option value="2025">2025</Option>
                    <Option value="2026">2026</Option>
                </Select> */}
            </div>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis allowDecimals={false} />
                    <Tooltip
                        labelFormatter={(label, payload) => {
                            if (payload && payload.length > 0) {
                                return payload[0].payload.monthYear;
                            }
                            return label;
                        }}
                    />
                    <Legend />
                    <Bar dataKey="totalUsers" barSize={30} name="Nombre total d’utilisateurs" fill="#a855f7" />
                </BarChart>
            </ResponsiveContainer>
        </Card>
    );
};

export default UserChart;
