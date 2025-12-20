import { useUserList } from '../../../api/api';
import { Button, Input, Select, Table, Tag } from 'antd';
import { EyeOutlined, SearchOutlined } from '@ant-design/icons';
import { MdBlock } from 'react-icons/md';
import IsLoading from '../../../components/IsLoading';
import IsErrorComponent from '../../../components/IsErrorComponent';
import { ActionModal } from './components/ActionModal';
import { useState } from 'react';
import { AllScansModal } from './components/AllScansModal';

function UsersList() {
    const [isActionModalOpen, setIsActionModalOpen] = useState(false);
    const [selectedUserForAction, setSelectedUserForAction] = useState(null);

    const [isScansModalOpen, setIsScansModalOpen] = useState(false);
    const [selectedUserForScans, setSelectedUserForScans] = useState([]);

    const { userList, isLoading, isError, error, refetch } = useUserList();

    const handleViewAllScans = (user: any) => {
        setSelectedUserForScans(user?.image_analysis);
        setIsScansModalOpen(true);
    };

    const onAction = (user: any) => {
        setSelectedUserForAction(user);
        setIsActionModalOpen(true);
    };

    const handleModalClose = () => {
        setSelectedUserForAction(null);
        setIsActionModalOpen(false);
        setSelectedUserForScans([]);
        setIsScansModalOpen(false);
    };

    const columns = [
        {
            title: 'Nom complet',
            dataIndex: 'full_name',
            key: 'full_name',
            width: 150,
            render: (text: string) => <span>{text || 'N/D'}</span>,
        },
        {
            title: 'E-mail',
            dataIndex: 'email',
            key: 'email',
            width: 200,
        },
        {
            title: 'Numéro de téléphone',
            dataIndex: 'phone_number',
            key: 'phone_number',
            width: 150,
            render: (text: string) => <span>{text || 'N/D'}</span>,
        },
        {
            title: 'Total des scans',
            dataIndex: 'total_analyses',
            key: 'total_analyses',
            width: 100,
        },
        {
            title: 'Abonnement',
            dataIndex: 'subscription_plan',
            key: 'subscription_plan',
            width: 120,
            render: (text: string) => {
                if (text === 'Standard Plan') {
                    return <Tag color="green">Forfait Standard</Tag>;
                } else if (text === 'Basic Plan') {
                    return <Tag color="blue">Forfait Basique</Tag>;
                } else if (text) {
                    return <Tag color="orange">{text}</Tag>;
                } else {
                    return <Tag color="red">N/D</Tag>;
                }
            },
        },
        {
            title: 'Scans précédents',
            key: 'previousScans',
            width: 130,
            render: (_: any, record: any) => (
                <Button icon={<EyeOutlined />} onClick={() => handleViewAllScans(record)}>
                    Tous les scans
                </Button>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            width: 100,
            render: (_: any, record: any) => (
                <Button type="primary" danger icon={<MdBlock />} onClick={() => onAction(record)} />
            ),
        },
    ];

    if (isLoading) return <IsLoading />;
    if (isError) return <IsErrorComponent refetch={refetch} error={error} />;

    return (
        <div
            style={{
                padding: 24,
                borderRadius: 8,
                boxShadow:
                    '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
                border: '1px solid #f0f0f0',
            }}
        >
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Gestion des utilisateurs</h2>
                <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                    {/* <Input
                        placeholder="Search by name or email"
                        // value={searchQuery}
                        // onChange={(e) => onSearchChange(e.target.value)}
                        prefix={<SearchOutlined />}
                        style={{ width: 250 }}
                    />

                    <Select
                        // value={statusFilter}
                        // onChange={onStatusFilterChange}
                        placeholder="Filter by status"
                        style={{ width: 150 }}
                        options={[
                            { value: 'all', label: 'All Users' },
                            { value: 'active', label: 'Active' },
                            { value: 'blocked', label: 'Blocked' },
                        ]}
                    /> */}
                </div>
            </div>

            <Table columns={columns} dataSource={userList?.results} rowKey="id" />

            <ActionModal
                isOpen={isActionModalOpen}
                user={selectedUserForAction}
                onClose={handleModalClose}
                refetch={refetch}
            />

            <AllScansModal
                isOpen={isScansModalOpen}
                scans={selectedUserForScans}
                onClose={handleModalClose}
                refetch={refetch}
            />
        </div>
    );
}

export default UsersList;
