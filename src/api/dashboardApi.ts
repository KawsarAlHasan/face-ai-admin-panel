import { useQuery } from '@tanstack/react-query';
import { API } from './api';

// dashboard user overview
export const useDasUserOver = () => {
    const getData = async () => {
        const response = await API.get('/api/ai/admin/user-overview/');
        return response.data;
    };

    const {
        data: dashUserOver = [],
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ['dashUserOver'],
        queryFn: getData,
    });

    return { dashUserOver, isLoading, isError, error, refetch };
};

// dashboard user graph
export const useUserGraph = () => {
    const getData = async () => {
        const response = await API.get('/api/ai/admin/user-graph/');
        return response.data.user_signups;
    };

    const {
        data: userGraph = [],
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ['userGraph'],
        queryFn: getData,
    });

    return { userGraph, isLoading, isError, error, refetch };
};

// dashboard payment graph
export const usePaymentGraph = () => {
    const getData = async () => {
        const response = await API.get('/api/ai/admin/payment-graph/');
        return response.data.payments;
    };

    const {
        data: paymentGraph = [],
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ['paymentGraph'],
        queryFn: getData,
    });

    return { paymentGraph, isLoading, isError, error, refetch };
};
