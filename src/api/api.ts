import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// export const BASE_URL = import.meta.env.VITE_BASE_URL;
export const BASE_URL = "https://faceai.dsrt321.online";

export const API = axios.create({
    baseURL: `${BASE_URL}`,
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// get admin dashboard
export const useAdminProfile = () => {
    const getData = async () => {
        const response = await API.get('/api/auth/user/');
        return response.data;
    };

    const {
        data: adminProfile = null,
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ['adminProfile'],
        queryFn: getData,
    });

    return { adminProfile, isLoading, isError, error, refetch };
};

// sign out
export const signOutAdmin = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
};

// all payment list
export const usePaymentList = () => {
    const getData = async () => {
        const response = await API.get('/api/ai/admin/payment/');
        return response.data;
    };

    const {
        data: paymentList = [],
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ['paymentList'],
        queryFn: getData,
    });

    return { paymentList, isLoading, isError, error, refetch };
};

// all admins list
export const useAdminList = () => {
    const getData = async () => {
        const response = await API.get('/api/auth/user/list/');
        return response.data;
    };

    const {
        data: adminList = [],
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ['adminList'],
        queryFn: getData,
    });

    return { adminList, isLoading, isError, error, refetch };
};

// all users management list
export const useUserList = () => {
    const getData = async () => {
        const response = await API.get('/api/ai/admin/user-management/');
        return response.data;
    };

    const {
        data: userList = [],
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ['userList'],
        queryFn: getData,
    });

    return { userList, isLoading, isError, error, refetch };
};
