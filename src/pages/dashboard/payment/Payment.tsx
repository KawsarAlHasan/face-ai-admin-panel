import { Table } from 'antd';
import { usePaymentList } from '../../../api/api';
import IsErrorComponent from '../../../components/IsErrorComponent';
import IsLoading from '../../../components/IsLoading';

const Payment = () => {
    const { paymentList, isLoading, isError, error, refetch } = usePaymentList();

    const dataSource = paymentList?.subscriptions;

    const formatDateTime = (dateString: any) => {
        if (!dateString) return '-';

        const date = new Date(dateString.replace(' ', 'T'));

        return new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        }).format(date);
    };

    const columns = [
        {
            title: 'Nom',
            dataIndex: 'user',
            key: 'user',
        },
        {
            title: 'E-mail',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Forfait',
            dataIndex: 'plan',
            key: 'plan',
        },
        {
            title: 'Montant payé',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Date',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (created_at: any) => formatDateTime(created_at),
        },
    ];

    if (isLoading) {
        return <IsLoading />;
    }

    if (isError) {
        return <IsErrorComponent error={error} refetch={refetch} />;
    }

    return (
        <div className="rounded-lg shadow-sm border border-gray-200 p-4">
            <h1 className="text-2xl font-semibold mb-4">Liste de paiement</h1>
            <Table key={'id'} columns={columns} dataSource={dataSource} />
        </div>
    );
};

export default Payment;
