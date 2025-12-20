'use client';

import { Table, Button, Tag } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { User } from '../../../../demo-data/user-data';
import { MdBlock } from 'react-icons/md';

interface UsersTableProps {
    users: User[];
    onViewAllScans: (user: User) => void;
    onAction: (user: User) => void;
}

export function UsersTable({ users, onViewAllScans, onAction }: UsersTableProps) {
    const columns = [
        {
            title: 'SL no.',
            dataIndex: 'serialId',
            key: 'serialId',
            width: 100,
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
            key: 'fullName',
            width: 150,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 200,
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            width: 150,
        },
        {
            title: 'Total Scan',
            dataIndex: 'totalScans',
            key: 'totalScans',
            width: 100,
        },
        {
            title: 'Subscription',
            dataIndex: 'subscription',
            key: 'subscription',
            width: 120,
            render: (text: string) => <Tag className="capitalize">{text}</Tag>,
        },
        {
            title: 'Previous Scans',
            key: 'previousScans',
            width: 130,
            render: (_: any, record: User) => (
                <Button icon={<EyeOutlined />} onClick={() => onViewAllScans(record)}>
                    All Scans
                </Button>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            width: 100,
            render: (_: any, record: User) => (
                <Button type="primary" danger icon={<MdBlock />} onClick={() => onAction(record)} />
            ),
        },
    ];

    return <Table columns={columns} dataSource={users} rowKey="id" pagination={{ pageSize: 9 }} />;
}
