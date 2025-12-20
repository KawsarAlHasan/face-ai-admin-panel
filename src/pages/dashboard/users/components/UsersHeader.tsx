'use client';

import { Input, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

interface UsersHeaderProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    statusFilter: string;
    onStatusFilterChange: (status: string) => void;
}

export function UsersHeader({ searchQuery, onSearchChange, statusFilter, onStatusFilterChange }: UsersHeaderProps) {
    return (
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Users</h2>
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                <Input
                    placeholder="Search by name or email"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    prefix={<SearchOutlined />}
                    style={{ width: 250 }}
                />

                <Select
                    value={statusFilter}
                    onChange={onStatusFilterChange}
                    style={{ width: 150 }}
                    options={[
                        { value: 'all', label: 'All Users' },
                        { value: 'active', label: 'Active' },
                        { value: 'blocked', label: 'Blocked' },
                    ]}
                />
            </div>
        </div>
    );
}
