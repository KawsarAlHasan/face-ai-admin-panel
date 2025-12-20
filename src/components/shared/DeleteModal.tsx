import { Button, Modal } from 'antd';
import { ExclamationCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { toast } from 'sonner';
import { API } from '../../api/api';

interface DeleteModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    deleteId: any;
    refetch: () => void;
    onClose: () => void;
}

export default function DeleteModal({ isOpen, setIsOpen, deleteId, refetch, onClose }: DeleteModalProps) {
    const handleDelete = async () => {
        console.log(deleteId, 'deleteId');
        try {
            const response = await API.delete(`/api/auth/user/delete/${deleteId}/`);
            console.log(response, 'response');
            toast.success('Utilisateur supprimé avec succès !');
            setIsOpen(false);
            onClose?.();
            refetch?.();
        } catch (error: any) {
            console.log(error, 'error');
            toast.error('Échec de la suppression de l’utilisateur.');
        }
    };

    return (
        <Modal
            open={isOpen}
            onCancel={() => setIsOpen(false)}
            title="Supprimer l’élément"
            footer={null}
            width={480}
            centered
        >
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                <ExclamationCircleOutlined style={{ fontSize: 32, color: '#ff4d4f' }} />
                <div>
                    <h3 style={{ fontSize: '16px', marginBottom: 4 }}>Êtes-vous sûr ?</h3>
                    <p style={{ color: '#595959' }}>
                        Cette action est irréversible. Cela supprimera définitivement l’élément et toutes les données
                        associées.
                    </p>
                </div>
            </div>

            <div
                style={{
                    background: '#fff1f0',
                    border: '1px solid #ffa39e',
                    borderRadius: 6,
                    padding: 12,
                    marginBottom: 20,
                    display: 'flex',
                    gap: '8px',
                    alignItems: 'center',
                }}
            >
                <CloseCircleOutlined style={{ color: '#ff7875', fontSize: 18 }} />
                <p style={{ margin: 0, color: '#d4380d' }}>
                    <strong>Avertissement :</strong> Il s’agit d’une action destructive qui ne peut pas être annulée.
                </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <Button onClick={() => setIsOpen(false)}>Annuler</Button>
                <Button onClick={handleDelete} danger>
                    Supprimer
                </Button>
            </div>
        </Modal>
    );
}
