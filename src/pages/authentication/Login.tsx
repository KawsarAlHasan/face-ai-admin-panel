import { Button, Checkbox, ConfigProvider, Form, FormProps, Input } from 'antd';
import { FieldNamesType } from 'antd/es/cascader';
import { Link, useNavigate } from 'react-router-dom';
import { API } from '../../api/api';
import { toast } from 'sonner';
import { useState } from 'react';

export type errorType = {
    data: {
        errorMessages: { message: string }[];
        message: string;
    };
};

const Login = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const onFinish: FormProps<FieldNamesType>['onFinish'] = async (values: any) => {
        setIsSubmitting(true);
        try {
            const res = await API.post('/api/auth/login/', values);

            if (res.status === 200) {
                localStorage.setItem('token', res.data.access);
                navigate('/');
            }

            console.log(res);
        } catch (error: any) {
            toast.error(error?.response?.data?.detail || "Une erreur s'est produite");
            console.log(error);
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
            <div className="flex items-center justify-center p-5 h-screen">
                <div className="bg-white max-w-[630px] w-full rounded-lg drop-shadow-2xl p-10 pt-0 mb-10">
                    <div className="flex flex-col justify-center items-center !pb-3 text-center">
                        <img src="/favicon.svg" alt="" />
                        <h1 className="text-3xl text-[#000] font-medium text-center mt-2">
                            Connexion à votre compte !
                        </h1>
                        <p className="text-xl text-gray-400">
                            Veuillez entrer votre email et mot de passe pour continuer
                        </p>
                    </div>

                    <Form
                        name="normal_login"
                        className="login-form"
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
                            <Input placeholder="Entrez votre adresse e-mail" type="email" className="h-12 px-6" />
                        </Form.Item>

                        <Form.Item
                            label={
                                <label htmlFor="password" className="block text-primaryText mb-1 text-lg">
                                    Mot de passe
                                </label>
                            }
                            name="password"
                            rules={[{ required: true, message: 'Veuillez entrer votre mot de passe !' }]}
                        >
                            <Input.Password placeholder="Entrez votre mot de passe" className="h-12 px-6" />
                        </Form.Item>

                        <div className="flex items-center justify-between mb-12">
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox className="text-primaryText text-lg">Se souvenir de moi</Checkbox>
                            </Form.Item>
                            <Link to="/forget-password" className="text-primary text-md">
                                Mot de passe oublié ?
                            </Link>
                        </div>

                        <Form.Item>
                            <Button
                                className="!bg-[#A855F7]"
                                loading={isSubmitting}
                                htmlType="submit"
                                style={{
                                    height: 45,
                                    width: '100%',
                                    fontWeight: 500,
                                    color: '#fff',
                                    fontSize: 20,
                                }}
                            >
                                Se connecter
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default Login;
