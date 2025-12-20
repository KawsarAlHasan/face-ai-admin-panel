import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from '../pages/authentication/Login';
import ForgetPassword from '../pages/authentication/ForgetPassword';
import VerifyOtp from '../pages/authentication/VerifyOtp';
import NewPassword from '../pages/authentication/NewPassword';
import Dashboard from '../pages/dashboard/dashboard';
import TermsAndCondition from '../pages/dashboard/terms-and-condition';
import Profile from '../pages/dashboard/profile';
import PrivacyPolicy from '../pages/dashboard/privacy-policy';
import ErrorPage from '../pages/error/ErrorPage';
import FAQCategoryPage from '../pages/dashboard/faq';
import FAQs from '../pages/dashboard/faq/faqs';
import NotificationPage from '../pages/dashboard/notification';
import Administrators from '../pages/dashboard/administrators';
import Payment from '../pages/dashboard/payment/Payment';
import PrivateRoute from './PrivateRoute';
import UsersList from '../pages/dashboard/users';

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <PrivateRoute>
                <App />
            </PrivateRoute>
        ),
        errorElement: <ErrorPage />,
        children: [
            { path: '', element: <Dashboard /> },
            { path: 'users', element: <UsersList /> },
            { path: 'administrators', element: <Administrators /> },
            { path: 'payment', element: <Payment /> },
            { path: 'profile', element: <Profile /> },
            { path: 'notification', element: <NotificationPage /> },
            { path: 'privacy-policy', element: <PrivacyPolicy /> },
            { path: 'terms-and-condition', element: <TermsAndCondition /> },
            { path: 'faq', element: <FAQCategoryPage /> },
            { path: 'faq/:category', element: <FAQs /> },
        ],
    },
    { path: '/login', element: <Login /> },
    { path: '/forget-password', element: <ForgetPassword /> },
    { path: '/verify-otp', element: <VerifyOtp /> },
    { path: '/new-password', element: <NewPassword /> },
]);

export default router;
