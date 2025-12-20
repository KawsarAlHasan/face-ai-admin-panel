'use client';

import { Modal, Space, Tag } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { ScanDetailsModal } from './ScanDetailsModal';

interface AllScansModalProps {
    isOpen: boolean;
    scans: any[];
    onClose: () => void;
    refetch: () => void;
}

export function AllScansModal({ isOpen, scans, onClose, refetch }: AllScansModalProps) {
    const [selectedScan, setSelectedScan] = useState<any>(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

    const handleViewScanDetails = (scan: any) => {
        setSelectedScan(scan);
        setIsDetailModalOpen(true);
    };

    const handleDetailModalClose = () => {
        setSelectedScan(null);
        setIsDetailModalOpen(false);
    };

    const getRatingColor = (rating: number) => {
        if (rating >= 8.5) return '#52c41a';
        if (rating >= 7.0) return '#1890ff';
        if (rating >= 5.5) return '#faad14';
        return '#ff4d4f';
    };

    return (
        <>
            <Modal
                title={`Tous les scans (${scans?.length || 0} au total)`}
                open={isOpen}
                onCancel={onClose}
                footer={null}
                width={700}
                centered
            >
                <div style={{ maxHeight: 500, overflowY: 'auto' }}>
                    {!scans || scans.length === 0 ? (
                        <div
                            style={{
                                textAlign: 'center',
                                padding: '40px 20px',
                                color: '#999',
                            }}
                        >
                            <p>Aucun scan disponible</p>
                        </div>
                    ) : (
                        scans.map((scan: any, index: number) => (
                            <div
                                key={scan.id}
                                style={{
                                    padding: 16,
                                    border: '1px solid #f0f0f0',
                                    borderRadius: 8,
                                    marginBottom: 12,
                                    backgroundColor: '#fafafa',
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#f0f0f0';
                                    e.currentTarget.style.borderColor = '#d9d9d9';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = '#fafafa';
                                    e.currentTarget.style.borderColor = '#f0f0f0';
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        gap: 16,
                                    }}
                                >
                                    <div style={{ flex: 1 }}>
                                        <Space direction="vertical" size={8} style={{ width: '100%' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                                <span
                                                    style={{
                                                        fontWeight: 600,
                                                        fontSize: 16,
                                                        color: '#1890ff',
                                                    }}
                                                >
                                                    Scan #{scans.length - index}
                                                </span>
                                                <span
                                                    style={{
                                                        fontSize: 13,
                                                        color: '#8c8c8c',
                                                        backgroundColor: '#fff',
                                                        padding: '2px 8px',
                                                        borderRadius: 4,
                                                        border: '1px solid #f0f0f0',
                                                    }}
                                                >
                                                    ID : {scan.id}
                                                </span>
                                            </div>

                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexWrap: 'wrap',
                                                    gap: 8,
                                                    marginTop: 4,
                                                }}
                                            >
                                                <Tag color="blue">
                                                    Peau : {scan.ratings?.skin_quality?.toFixed(1) || 'N/D'}
                                                </Tag>
                                                <Tag color="green">
                                                    Mâchoire : {scan.ratings?.jawline_definition?.toFixed(1) || 'N/D'}
                                                </Tag>
                                                <Tag color="purple">
                                                    Symétrie : {scan.ratings?.symmetry?.toFixed(1) || 'N/D'}
                                                </Tag>
                                                <Tag color="orange">
                                                    Proportions :{' '}
                                                    {scan.ratings?.facial_proportions?.toFixed(1) || 'N/D'}
                                                </Tag>
                                            </div>
                                        </Space>
                                    </div>

                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 16,
                                        }}
                                    >
                                        <div
                                            style={{
                                                textAlign: 'center',
                                                minWidth: 80,
                                            }}
                                        >
                                            <div
                                                style={{
                                                    fontSize: 24,
                                                    fontWeight: 700,
                                                    color: getRatingColor(scan.average_rating || 0),
                                                }}
                                            >
                                                {scan.average_rating?.toFixed(1) || 'N/D'}
                                            </div>
                                            <div
                                                style={{
                                                    fontSize: 12,
                                                    color: '#8c8c8c',
                                                    marginTop: 2,
                                                }}
                                            >
                                                Global
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handleViewScanDetails(scan)}
                                            style={{
                                                padding: '8px 16px',
                                                backgroundColor: '#1890ff',
                                                color: '#fff',
                                                border: 'none',
                                                borderRadius: 6,
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 6,
                                                fontSize: 14,
                                                fontWeight: 500,
                                                transition: 'all 0.3s ease',
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = '#40a9ff';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor = '#1890ff';
                                            }}
                                        >
                                            <EyeOutlined />
                                            Voir les détails
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </Modal>

            <ScanDetailsModal isOpen={isDetailModalOpen} onClose={handleDetailModalClose} scan={selectedScan} />
        </>
    );
}
