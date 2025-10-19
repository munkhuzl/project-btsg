'use client';

import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/navigation';
import { useSignUpMutation } from '@/generated';
import {toast} from "react-toastify";


const SignUp = () => {
    const router = useRouter();
    const [signUpMutation, { loading }] = useSignUpMutation();

    const register = async (values: { password: string, email: string }) => {

        try {
            await signUpMutation({variables: {
                    input: {
                        email: values.email,
                        password: values.password,
                    }
                }}).then(()=>{
                toast.success('Хэрэглэгч амжилттай бүртгэгдлээ.');
                router.push('/login');
            })
        } catch (err) {
            toast.error('Алдаа гарлаа');
            console.error('Алдаа гарлаа', err);
        }
    };

    const validationSchema = Yup.object(
        {
            email: Yup.string()
                .email('И-мэйл хаяг буруу байна')
                .email('И-мэйл хаяг буруу байна')
                .required('И-мэйл хаяг оруулна уу')
                .matches(
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    'И-мэйл хаяг буруу байна'
                )
                .min(5, 'И-мэйл хаяг хамгийн багадаа 5 тэмдэгт байх ёстой')
                .max(50, 'И-мэйл хаяг хамгийн ихдээ 50 тэмдэгт байх ёстой'),


        },

    );
    return (
        <div className="my-24" >
            <Card className="bg-white md:w-[500px] w-[350px] h-full m-auto mx-auto p-12">
                <h1 className="font-bold text-center mb-6 mx-4">Нэвтрэх</h1>
                <Image src={"/logo.png"} alt="logo" width={150} height={150} className="mx-auto" />
                <Formik initialValues={{ password: '', email: '' }} validationSchema={validationSchema} onSubmit={register}>
                    {({ handleSubmit, handleChange, values }) => (
                        <Form onSubmit={handleSubmit}>
                            <div className="mt-8 mx-4 flex flex-col gap-2">
                                <Label className="mt-4">И-мэйл хаяг</Label>
                                <Input id="email" placeholder="Email" className="mt-2" name="email" onChange={handleChange} value={values.email} />

                                <Label className='mt-3' >Нууц үг</Label>
                                <Input className="" placeholder='нууц үг' onChange={handleChange} value={values.password} id='password'/>
                            </div>
                            <Button type="submit" className="my-6 w-full" disabled={loading} >
                                Бүртгүүлэх
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Card>
        </div>
    );
};

export default SignUp;
