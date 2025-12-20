import { Button, Modal, Space, Table } from 'antd';
import { useState } from 'react';
import AdminModal from './AdminModal';
import IsLoading from '../../../components/IsLoading';
import IsErrorComponent from '../../../components/IsErrorComponent';
import { API, useAdminList } from '../../../api/api';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { FaRegUserCircle } from 'react-icons/fa';
import { toast } from 'sonner';

const Administrators = () => {
    const { adminList, isLoading, isError, error, refetch } = useAdminList();

    const [makeAdminModal, setMakeAdminModal] = useState(false);

    const dataSource = adminList?.results;

    // 🗑️ delete confirm modal
    const showDeleteConfirm = (adminId: any) => {
        Modal.confirm({
            title: 'Êtes-vous sûr de vouloir supprimer cet administrateur ?',
            content: 'Cette action est irréversible.',
            okText: 'Oui, supprimer',
            okType: 'danger',
            cancelText: 'Annuler',
            async onOk() {
                try {
                    await API.delete(`/api/auth/user/delete/${adminId}/`);
                    toast.success('Administrateur supprimé avec succès !');
                    refetch();
                } catch (err) {
                    console.log(err);
                    toast.error('Échec de la suppression de l’administrateur.');
                }
            },
        });
    };

    const columns = [
        {
            title: 'Nom',
            key: 'full_name',
            render: (_: any, record: any) => (
                <div className="flex flex-items-center gap-2">
                    {record?.profile_picture ? (
                        <img
                            className="w-[40px] h-[40px] rounded-full object-cover"
                            src={record?.profile_picture}
                            alt={record?.full_name}
                        />
                    ) : (
                        <FaRegUserCircle className="w-[40px] h-[40px] rounded-full object-cover" />
                    )}

                    <h1 className="mt-2">{record?.full_name || 'N/D'}</h1>
                </div>
            ),
        },
        {
            title: 'E-mail de l’administrateur',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Numéro de téléphone',
            dataIndex: 'phone_number',
            key: 'phone_number',
            render: (phone_number: string) => (phone_number ? phone_number : 'N/D'),
        },
        {
            title: 'Type d’administrateur',
            dataIndex: 'is_superuser',
            key: 'is_superuser',
            render: (is_superuser: boolean) => (is_superuser ? 'Super administrateur' : 'Administrateur'),
        },
        {
            title: 'Statut de l’administrateur',
            dataIndex: 'is_active',
            key: 'is_active',
            render: (is_active: boolean) => (is_active ? 'Actif' : 'Inactif'),
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: 150,
            textAlign: 'center',
            render: (_: any, record: any) => {
                const isSuperAdmin = record.is_superuser;

                return (
                    <Space size="middle">
                        <DeleteOutlined
                            className={`text-[23px] bg-[#E30000] p-1 rounded-sm text-white ${
                                isSuperAdmin ? 'cursor-not-allowed opacity-50' : 'hover:text-red-300 cursor-pointer'
                            }`}
                            onClick={isSuperAdmin ? undefined : () => showDeleteConfirm(record?.id)}
                        />
                    </Space>
                );
            },
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
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold">Gestion de l'administrateur</h1>

                <Button
                    onClick={() => setMakeAdminModal(true)}
                    type="primary"
                    style={{
                        height: 45,
                    }}
                >
                    + Ajouter un administrateur
                </Button>
            </div>

            <Table key={'id'} columns={columns} dataSource={dataSource} />
            <AdminModal open={makeAdminModal} setOpen={setMakeAdminModal} refetch={refetch} />
        </div>
    );
};

export default Administrators;
