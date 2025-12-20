import { Button, ConfigProvider, Form, Input } from 'antd';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { API } from '../../api/api';
import { getFromLocalStorage } from '../../utils/local-storage';
import { useState } from 'react';

const NewPassword = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const email = getFromLocalStorage('forgetEmail');
    const code = getFromLocalStorage('resetToken');

    const onFinish = async (values: { new_password: string; confirm_password: string }) => {
        setIsSubmitting(true);
        try {
            const payload = {
                email: email,
                code: code,
                new_password: values.new_password,
                new_password2: values.confirm_password,
            };
            const response = await API.post('/api/auth/set_new_password/', payload);
            console.log(response, 'response');
            localStorage.removeItem('resetToken');
            localStorage.removeItem('forgetEmail');

            localStorage.setItem('token', response?.data?.tokens?.access);
            toast.success('Mot de passe mis à jour avec succès !');
            navigate('/');
        } catch (error: any) {
            console.log(error, 'error');
            toast.error(
                error?.response?.data?.non_field_errors
                    ? error?.response?.data?.non_field_errors[0]
                    : "Une erreur s'est produite",
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#A855F7',
                    colorBgContainer: '#F1F4F9',
                },
                components: {
                    Input: {
                        borderRadius: 10,
                        colorBorder: 'transparent',
                        colorPrimaryBorder: 'transparent',
                        hoverBorderColor: 'transparent',
                        controlOutline: 'none',
                        activeBorderColor: 'transparent',
                    },
                },
            }}
        >
            <div className="flex items-center justify-center h-screen p-5">
                <div className="bg-white max-w-[630px] w-full drop-shadow-2xl p-10 pt-0">
                    <div className="max-w-md mx-auto space-y-3 text-center flex flex-col justify-center items-center">
                        <img src="/favicon.svg" alt="" />
                        <h1 className="text-3xl font-medium text-center text-[#000]">
                            Définir un nouveau mot de passe
                        </h1>
                        <p className="text-gray-600">
                            Créez un nouveau mot de passe. Assurez-vous qu'il diffère des précédents pour des raisons de
                            sécurité.
                        </p>
                    </div>

                    <Form
                        name="normal_NewPassword"
                        className="NewPassword-form mt-5"
                        layout="vertical"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label={
                                <label htmlFor="password" className="block text-primaryText mb-1 text-lg">
                                    Nouveau mot de passe
                                </label>
                            }
                            name="new_password"
                            rules={[{ required: true, message: 'Veuillez saisir un nouveau mot de passe !' }]}
                        >
                            <Input.Password placeholder="KK!@#$15856" className="h-12 px-6" />
                        </Form.Item>

                        <Form.Item
                            label={
                                <label htmlFor="password" className="block text-primaryText mb-1 text-lg">
                                    Confirmer le mot de passe
                                </label>
                            }
                            name="confirm_password"
                            rules={[
                                { required: true, message: 'Veuillez confirmer votre mot de passe !' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (value && value !== getFieldValue('new_password')) {
                                            return Promise.reject(
                                                new Error('Les deux mots de passe saisis ne correspondent pas !'),
                                            );
                                        }
                                        return Promise.resolve();
                                    },
                                }),
                            ]}
                        >
                            <Input.Password placeholder="KK!@#$15856" className="h-12 px-6" />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                className="!bg-[#A855F7] mt-5"
                                htmlType="submit"
                                loading={isSubmitting}
                                style={{
                                    height: 45,
                                    width: '100%',
                                    fontWeight: 500,
                                    color: '#fff',
                                    fontSize: 20,
                                }}
                            >
                                Mettre à jour le mot de passe
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default NewPassword;
