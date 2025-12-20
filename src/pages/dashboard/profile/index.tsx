import { useState } from 'react';
import { EyeInvisibleOutlined, EyeOutlined, CameraOutlined } from '@ant-design/icons';
import { Tabs, Button, Input, message, Avatar, Form, Upload } from 'antd';
import { API, BASE_URL, useAdminProfile } from '../../../api/api';
import { toast } from 'sonner';
import Loading from '../../../components/Loading';

// JSON input describing form fields for both profile and password change
const profileFormFields = [
    {
        name: 'full_name',
        label: 'Nom',
        placeholder: 'Entrez votre nom',
        rules: [{ required: true, message: 'Veuillez entrer votre nom !' }],
    },
    {
        name: 'email',
        label: 'E-mail',
        placeholder: 'Entrez votre e-mail',
        rules: [
            { required: true, message: 'Veuillez entrer votre e-mail !' },
            { type: 'email', message: 'Veuillez entrer un e-mail valide !' },
        ],
    },
    {
        name: 'phone_number',
        label: 'Numéro de contact',
        placeholder: 'Entrez votre numéro de contact',
        rules: [
            { required: true, message: 'Veuillez entrer votre numéro de contact !' },
            { pattern: /^[\d+\-\s()]+$/, message: 'Veuillez entrer un numéro valide !' },
        ],
    },
];

const passwordFormFields = [
    {
        name: 'current',
        label: 'Mot de passe actuel',
        placeholder: 'Entrez le mot de passe actuel',
        rules: [{ required: true, message: 'Veuillez entrer votre mot de passe actuel !' }],
        type: 'password',
    },
    {
        name: 'new',
        label: 'Nouveau mot de passe',
        placeholder: 'Entrez le nouveau mot de passe',
        rules: [
            { required: true, message: 'Le mot de passe est requis' },
            {
                pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
                message:
                    'Le mot de passe doit contenir au moins 8 caractères, 1 lettre majuscule, 1 chiffre et 1 caractère spécial',
            },
        ],
        type: 'password',
    },
    {
        name: 'confirm',
        label: 'Confirmer le nouveau mot de passe',
        placeholder: 'Confirmez le nouveau mot de passe',
        dependencies: ['new'],
        type: 'password',
        rules: [
            { required: true, message: 'Veuillez confirmer votre nouveau mot de passe !' },
            ({ getFieldValue }: any) => ({
                validator(_: any, value: string) {
                    if (!value || getFieldValue('new') === value) {
                        return Promise.resolve();
                    }
                    return Promise.reject(new Error('Les mots de passe ne correspondent pas !'));
                },
            }),
        ],
    },
];

export default function Profile() {
    const [isChangePassword, setIsChangePassword] = useState(false);
    const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
    const [activeTab, setActiveTab] = useState('1');
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false,
    });
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const { adminProfile, isLoading, isError, error, refetch } = useAdminProfile();

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <div>Erreur : une erreur est survenue</div>;
    }

    // Initial values from API data
    const initialProfileValues = {
        full_name: adminProfile?.user?.full_name || '',
        email: adminProfile?.user?.email || '',
        phone_number: adminProfile?.user?.phone_number || '',
    };

    const initialPasswordValues = { current: '', new: '', confirm: '' };

    // Handle profile image change
    const handleImageChange = (info: any) => {
        const file = info.file.originFileObj || info.file;
        if (file) {
            setProfileImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // Form Handlers
    const handleProfileSubmit = async (values: typeof initialProfileValues) => {
        setIsUpdatingProfile(true);
        try {
            const formdata = new FormData();
            formdata.append('full_name', values.full_name);
            formdata.append('phone_number', values.phone_number);

            if (profileImage) {
                formdata.append('profile_picture', profileImage);
            }

            await API.patch('/api/auth/profile/update/', formdata);

            message.success('Profil mis à jour avec succès !');
            refetch();

            setProfileImage(null);
            setPreviewImage(null);
        } catch (error: any) {
            console.log(error, 'error');
            toast.error(error?.response?.data?.message || 'Échec de la mise à jour du profil');
        } finally {
            setIsUpdatingProfile(false);
        }
    };

    const handlePasswordSubmit = async (values: typeof initialPasswordValues) => {
        if (values.new !== values.confirm) {
            message.error('Les nouveaux mots de passe ne correspondent pas !');
            return;
        }
        setIsChangePassword(true);

        try {
            await API.post('/api/auth/change-password/', {
                old_password: values.current,
                new_password: values.new,
                confirm_password: values.confirm,
            });

            message.success('Mot de passe modifié avec succès !');
            setShowPasswords({ current: false, new: false, confirm: false });
        } catch (error: any) {
            console.log(error, 'error');
            toast.error(
                error?.response?.data?.old_password
                    ? error?.response?.data?.old_password[0]
                    : 'Une erreur est survenue',
            );
        } finally {
            setIsChangePassword(false);
        }
    };

    const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
        setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const renderFields = (fields: typeof profileFormFields | typeof passwordFormFields, isPassword?: boolean) =>
        fields.map((field: any) => {
            if (isPassword) {
                return (
                    <Form.Item
                        key={field.name}
                        name={field.name}
                        label={<label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>}
                        dependencies={field.dependencies}
                        rules={field.rules}
                    >
                        <div className="relative">
                            <Input
                                size="large"
                                type={showPasswords[field.name as keyof typeof showPasswords] ? 'text' : 'password'}
                                placeholder={field.placeholder}
                                className="rounded-lg pr-10"
                                autoComplete="off"
                            />
                            <span
                                className="absolute right-3 top-3 cursor-pointer text-gray-500 hover:text-gray-700"
                                onClick={() => togglePasswordVisibility(field.name as 'current' | 'new' | 'confirm')}
                            >
                                {showPasswords[field.name as keyof typeof showPasswords] ? (
                                    <EyeOutlined className="text-lg" />
                                ) : (
                                    <EyeInvisibleOutlined className="text-lg" />
                                )}
                            </span>
                        </div>
                    </Form.Item>
                );
            }

            return (
                <Form.Item
                    key={field.name}
                    name={field.name}
                    label={<label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>}
                    rules={field.rules}
                >
                    <Input
                        size="large"
                        placeholder={field.placeholder}
                        className="rounded-lg"
                        autoComplete={field.name === 'email' ? 'email' : undefined}
                        disabled={field.name === 'email'}
                    />
                </Form.Item>
            );
        });

    const getProfilePictureUrl = () => {
        if (previewImage) return previewImage;
        if (adminProfile?.user?.profile_picture) {
            if (adminProfile?.user?.profile_picture.startsWith('http')) {
                return adminProfile?.user?.profile_picture;
            }
            return `${BASE_URL}${adminProfile?.user?.profile_picture}`;
        }
        return undefined;
    };

    const tabItems = [
        {
            key: '1',
            label: 'Informations du profil',
            children: (
                <div className="space-y-6">
                    <div className="flex flex-col items-center">
                        <div className="relative">
                            <Avatar size={120} src={getProfilePictureUrl()} className="border-4 border-teal-50">
                                {!getProfilePictureUrl() && adminProfile?.user?.full_name?.charAt(0)?.toUpperCase()}
                            </Avatar>
                            <Upload
                                showUploadList={false}
                                beforeUpload={() => false}
                                onChange={handleImageChange}
                                accept="image/*"
                            >
                                <div className="absolute bottom-0 right-0 bg-primary rounded-full p-2 cursor-pointer hover:bg-primary/90 transition">
                                    <CameraOutlined className="text-white text-lg" />
                                </div>
                            </Upload>
                        </div>
                    </div>
                    <Form
                        name="profileForm"
                        layout="vertical"
                        initialValues={initialProfileValues}
                        onFinish={handleProfileSubmit}
                        requiredMark={false}
                    >
                        {renderFields(profileFormFields)}
                        <Form.Item>
                            <Button
                                type="primary"
                                size="large"
                                block
                                htmlType="submit"
                                className="!shadow-none !h-10"
                                loading={isUpdatingProfile}
                            >
                                Enregistrer les modifications
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            ),
        },
        {
            key: '2',
            label: 'Changer le mot de passe',
            children: (
                <div className="space-y-6">
                    <Form
                        name="passwordForm"
                        layout="vertical"
                        initialValues={initialPasswordValues}
                        onFinish={handlePasswordSubmit}
                        requiredMark={false}
                    >
                        {renderFields(passwordFormFields, true)}
                        <Form.Item>
                            <Button
                                loading={isChangePassword}
                                type="primary"
                                size="large"
                                block
                                htmlType="submit"
                                className="!shadow-none !h-10"
                            >
                                Enregistrer les modifications
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            ),
        },
    ];

    return (
        <div className="py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="p-6 sm:p-8">
                        <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} size="large" />
                    </div>
                </div>
            </div>
        </div>
    );
}
