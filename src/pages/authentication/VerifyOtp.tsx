import { Button, ConfigProvider, Form, FormProps, Input } from 'antd';
import { FieldNamesType } from 'antd/es/cascader';
import { useNavigate } from 'react-router-dom';
import { getFromLocalStorage } from '../../utils/local-storage';
import { toast } from 'sonner';
import { API } from '../../api/api';
import { useState } from 'react';

const VerifyOtp = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const email = getFromLocalStorage('forgetEmail');

    const onFinish: FormProps<FieldNamesType>['onFinish'] = async (values: any) => {
        setIsSubmitting(true);
        try {
            const response = await API.post('/api/auth/verify_code/', {
                email: email,
                code: values.otp,
            });

            console.log(response, 'response');

            localStorage.setItem('resetToken', JSON.stringify(values.otp));
            navigate('/new-password');
            toast.success('Email envoyé avec succès !');
        } catch (error: any) {
            console.log(error, 'error');
            toast.error(error?.response?.data?.non_field_errors[0] || "Une erreur s'est produite");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleResendOtp = async () => {
        try {
            const response = await API.post('/api/auth/forgot-password/', {
                email: email,
            });
            console.log(response, 'response');
            toast.success('Email renvoyé avec succès !');
        } catch (error: any) {
            console.log(error, 'error');
            toast.error(error?.response?.data?.email[0] || "Une erreur s'est produite");
        }
    };

    return (
        <ConfigProvider
            theme={{
                components: {
                    Input: {
                        controlHeight: 50,
                        borderRadius: 10,
                    },
                },
                token: {
                    colorPrimary: '#A855F7',
                },
            }}
        >
            <div className="flex items-center justify-center h-screen p-5">
                <div className="bg-white max-w-[630px] w-full rounded-lg drop-shadow-2xl shadow-lg p-10 pt-0">
                    <div className="text-primaryText space-y-3 text-center flex flex-col justify-center items-center">
                        <img src="/favicon.svg" alt="" />
                        <h1 className="text-3xl font-medium text-center mt-2 text-[#000]">Vérifiez votre email</h1>
                        <p>
                            Nous avons envoyé un lien de réinitialisation à {email}. Entrez le code à 6 chiffres
                            mentionné dans l'email.
                        </p>
                    </div>

                    <Form
                        name="normal_VerifyOtp"
                        className="my-0"
                        layout="vertical"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            className="flex items-center justify-center mx-auto mt-5"
                            name="otp"
                            rules={[{ required: true, message: 'Veuillez saisir le code OTP ici !' }]}
                        >
                            <Input.OTP style={{ width: 300 }} length={6} />
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
                                Vérifier le code
                            </Button>
                        </Form.Item>
                        <div className="text-center text-lg flex items-center justify-center gap-2">
                            <p className="text-primaryText">Vous n'avez pas reçu le code ?</p>
                            <p className="text-primary cursor-pointer active:text-red-400" onClick={handleResendOtp}>
                                Renvoyer
                            </p>
                        </div>
                    </Form>
                </div>
            </div>
        </ConfigProvider>
    );
};

export default VerifyOtp;
