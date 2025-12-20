'use client';

import { Modal, Button, Row, Col, Switch, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import { useState } from 'react';
import DeleteModal from '../../../../components/shared/DeleteModal';
import { toast } from 'sonner';

interface ActionModalProps {
    isOpen: boolean;
    user: any;
    onClose: any;
    refetch: () => void;
}

export function ActionModal({ isOpen, user, onClose, refetch }: ActionModalProps) {
    const [isBlocked, setIsBlocked] = useState(user?.status === 'blocked');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const handleToggleBlock = (checked: boolean) => {
     try {
        // const response = await API.put(`/api/auth/user/${user.id}/`, { status: checked ? 'blocked' : 'active' });
        // console.log(response, 'response');
        toast.success('User blocked successfully!');
        setIsBlocked(checked);
        refetch?.();
     } catch (error: any) {
        console.log(error, 'error');
        toast.error('Failed to block user.');
     }
    };

    if (!user) return null;

    return (
        <Modal title="Action" open={isOpen} onCancel={onClose} footer={null} centered>
            <Space direction="vertical" style={{ width: '100%' }} size="large">
                {/* Disable User Access */}
                {/* <Row
                    justify="space-between"
                    align="middle"
                    style={{
                        padding: 12,
                        border: '1px solid #f0f0f0',
                        borderRadius: 6,
                    }}
                >
                    <Col>
                        <span style={{ fontSize: 14 }}>Disable User Access</span>
                    </Col>
                    <Col>
                        <Switch checked={isBlocked} onChange={handleToggleBlock} />
                    </Col>
                </Row> */}

                {/* Delete User Account */}
                <Row
                    justify="space-between"
                    align="middle"
                    style={{
                        padding: 12,
                        border: '1px solid #f0f0f0',
                        borderRadius: 6,
                    }}
                >
                    <Col>
                        <span style={{ fontSize: 14 }}>Supprimer le compte utilisateur</span>
                    </Col>
                    <Col>
                        <Button
                            type="primary"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => {
                                setIsDeleteModalOpen(true);
                                setDeleteId(user.id);
                            }}
                        >
                            Supprimer
                        </Button>
                    </Col>
                </Row>
            </Space>
            <DeleteModal
                isOpen={isDeleteModalOpen}
                setIsOpen={setIsDeleteModalOpen}
                deleteId={deleteId}
                refetch={refetch}
                onClose={onClose}
            />
        </Modal>
    );
}
