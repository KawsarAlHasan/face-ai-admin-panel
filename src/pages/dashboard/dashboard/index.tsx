import { Card } from 'antd';
import TotalEarning from './TotalEarning';
import UserChart from './UserChart';
import { useDasUserOver } from '../../../api/dashboardApi';

const App: React.FC = () => {
    const { dashUserOver, isLoading, isError, error, refetch } = useDasUserOver();

    const StatCard: React.FC<{ icon: string; title: string; value: string }> = ({ icon, title, value }) => (
        <Card className="rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-2xl">
                    <img src={icon} alt="icon" className="w-8" />
                </div>
                <div>
                    <p className="text-gray-500 text-sm mb-1">{title}</p>
                    <p className="text-2xl font-bold">{value}</p>
                </div>
            </div>
        </Card>
    );

    const hour = new Date().getHours();
    let message = '';

    if (hour >= 5 && hour < 12) {
        message = 'Bonjour';
    } else if (hour >= 12 && hour < 16) {
        message = 'Bon après-midi';
    } else if (hour >= 16 && hour < 19) {
        message = 'Bonsoir';
    } else {
        message = 'Bonne nuit';
    }

    return (
        <div className="pb-5">
            <div>
                <div className="flex flex-col gap-y-2 py-5 px-[30px] rounded-lg shadow-sm border border-gray-200 mb-6">
                    <p className="text-[#121212]">Salut, {message}</p>
                    <h2 className="text-2xl font-semibold text-[#121212]">Bon retour sur le tableau de bord FaceAI</h2>
                </div>

                {/* Stats Cards */}
                <p className="text-2xl font-semibold text-[#121212] pb-3">Aperçu des utilisateurs</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <StatCard
                        icon="/icons/users.png"
                        title="Nombre total d’utilisateurs"
                        value={dashUserOver?.total_user || 0}
                    />
                    <StatCard
                        icon="/icons/earning.png"
                        title="Gains totaux"
                        value={`€${dashUserOver?.total_earnings || 0}`}
                    />
                    <StatCard
                        icon="/icons/package.png"
                        title="Total des abonnés"
                        value={dashUserOver?.total_subscriptions || 0}
                    />
                    <StatCard
                        icon="/icons/study-notes.png"
                        title="Total des analyses"
                        value={dashUserOver?.total_analysis || 0}
                    />
                </div>

                {/* Chart */}
                <div className="grid grid-cols-12 gap-2 items-center">
                    <div className="col-span-6">
                        <TotalEarning />
                    </div>
                    <div className="col-span-6">
                        <UserChart />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
