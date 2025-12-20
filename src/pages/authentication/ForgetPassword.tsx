import { Button, ConfigProvider, Form, FormProps, Input } from 'antd';
import { FieldNamesType } from 'antd/es/cascader';
import { useNavigate } from 'react-router-dom';
import { API } from '../../api/api';
import { toast } from 'sonner';
import { useState } from 'react';

const ForgetPassword = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const onFinish: FormProps<FieldNamesType>['onFinish'] = async (values: any) => {
        setIsSubmitting(true);
        try {
            const response = await API.post('/api/auth/forgot-password/', values);
            console.log(response, 'response');
            toast.success('Email envoyé avec succès !');
            localStorage.setItem('forgetEmail', JSON.stringify(values.email));
            navigate('/verify-otp');
        } catch (error: any) {
            console.log(error, 'error');
            toast.error(error?.response?.data?.email[0] || "Une erreur s'est produite");
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
                <div className="bg-white max-w-[630px] w-full rounded-lg drop-shadow-2xl p-10 pt-0">
                    <div className="flex flex-col justify-center items-center space-y-3 text-center mb-10">
                        <img src="/favicon.svg" alt="" />
                        <h1 className="text-3xl font-medium text-center mt-2 text-[#000]">
                            Mot de passe oublié
                        </h1>
                        <p className="text-xl text-gray-400">
                            Entrez votre adresse e-mail pour recevoir un code de vérification afin de réinitialiser votre mot de passe.
                        </p>
                    </div>

                    <Form
                        name="normal_ForgetPassword"
                        className="ForgetPassword-form"
                        layout="vertical"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label={
                                <label htmlFor="email" className="block text-primaryText mb-1 text-lg">
                                    Email
                                </label>
                            }
                            name="email"
                            rules={[{ required: true, message: 'Veuillez entrer votre email !' }]}
                        >
                            <Input placeholder="Entrez votre adresse e-mail" type="email" className="h-12 mb-12" />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                className="!bg-[#A855F7]"
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
                                Envoyer le code
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default ForgetPassword;
