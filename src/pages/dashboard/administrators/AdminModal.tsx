import { Button, Form, Input, Modal, message, Upload, Select } from 'antd';
import { CameraOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { API } from '../../../api/api';
import { toast } from 'sonner';

interface IModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    refetch?: () => void;
}

const AdminModal: React.FC<IModalProps> = ({ open, setOpen, refetch }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const handleClose = () => {
        form.resetFields();
        setProfileImage(null);
        setPreviewImage(null);
        setOpen(false);
    };

    // Handle profile image change
    const handleImageChange = (info: any) => {
        const file = info.file.originFileObj || info.file;
        if (file) {
            setProfileImage(file);
            // Create preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (values: any) => {
        setLoading(true);
        try {
            const formData = new FormData();

            // Append required fields
            formData.append('email', values.email);
            formData.append('password', values.password);
            formData.append('password2', values.password);
            formData.append('full_name', values.name);
            formData.append('phone_number', values.phone_number || '');

            // Append profile picture if selected
            if (profileImage) {
                formData.append('profile_picture', profileImage);
            }

            // Set admin privileges
            formData.append('is_staff', 'true');
            formData.append('is_superuser', values.is_superuser ? 'true' : 'false');
            formData.append('is_active', 'true');

            const res = await API.post('/api/auth/user/createsuperuser/', formData);
            console.log(res, 'res');

            message.success('Administrator added successfully!');

            // Reset form and close modal
            handleClose();

            // Refetch admin list if refetch function provided
            refetch?.();
        } catch (error: any) {
            console.log(error, 'error');

            // Handle specific error messages
            if (error?.response?.data) {
                const errorData = error.response.data;
                if (errorData.email) {
                    toast.error(errorData.email[0]);
                } else if (errorData.password) {
                    toast.error(errorData.password[0]);
                } else if (errorData.message) {
                    toast.error(errorData.message);
                } else if (errorData.detail) {
                    toast.error(errorData.detail);
                } else {
                    toast.error('Failed to add administrator');
                }
            } else {
                toast.error('Something went wrong');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            centered
            title={<p className="text-[24px] text-[#333333]">Add Administrator</p>}
            footer={false}
            open={open}
            onCancel={handleClose}
            width={500}
        >
            <Form
                form={form}
                style={{
                    color: '#767676',
                }}
                layout="vertical"
                onFinish={handleSubmit}
            >
                {/* Profile Picture Upload */}
                <div className="flex justify-center">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-gray-200">
                            {previewImage ? (
                                <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-3xl text-gray-400">👤</span>
                            )}
                        </div>
                        <Upload
                            showUploadList={false}
                            beforeUpload={() => false}
                            onChange={handleImageChange}
                            accept="image/*"
                        >
                            <div className="absolute bottom-4 right-0 bg-primary rounded-full px-2 py-1 cursor-pointer hover:bg-primary/90 transition shadow-md">
                                <CameraOutlined className="text-white text-sm" />
                            </div>
                        </Upload>
                    </div>
                </div>

                <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter name!' }]}>
                    <Input
                        style={{
                            height: '40px',
                        }}
                        placeholder="John Doe"
                    />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Please enter email!' },
                        { type: 'email', message: 'Please enter a valid email!' },
                    ]}
                >
                    <Input
                        style={{
                            height: '40px',
                        }}
                        type="email"
                        placeholder="email@gmail.com"
                    />
                </Form.Item>

                <Form.Item
                    label="Phone Number"
                    name="phone_number"
                    rules={[{ pattern: /^[\d+\-\s()]+$/, message: 'Please enter a valid phone number!' }]}
                >
                    <Input
                        style={{
                            height: '40px',
                        }}
                        placeholder="+880 1234567890"
                    />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        { required: true, message: 'Please enter password!' },
                        {
                            pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
                            message:
                                'Password must be at least 8 characters and contain 1 uppercase letter, 1 number, and 1 special character',
                        },
                    ]}
                >
                    <Input.Password
                        style={{
                            height: '40px',
                        }}
                        placeholder="******"
                    />
                </Form.Item>

                <Form.Item
                    label="Admin Type"
                    name="admin_type"
                    rules={[{ required: true, message: 'Please select admin type!' }]}
                >
                    <Select
                        style={{
                            height: '40px',
                        }}
                        placeholder="Select admin type"
                    >
                        <Select.Option value="True">Super Admin</Select.Option>
                        <Select.Option value="False">Admin</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item>
                    <div className="flex justify-center w-full">
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            style={{
                                height: 40,
                                width: '100%',
                            }}
                        >
                            Add Admin
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AdminModal;
