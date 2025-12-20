import { useAdminProfile } from '../api/api';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../components/Loading';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const { adminProfile, isLoading, isError, error, refetch } = useAdminProfile();

    const location = useLocation();
    const token = localStorage.getItem('token');

    if (isLoading) {
        return <Loading />;
    }

    if (isError || error || !adminProfile || !token) {
        localStorage.removeItem('token');
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default PrivateRoute;
