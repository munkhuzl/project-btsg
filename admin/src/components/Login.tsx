'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/navigation';
import { useLoginMutation } from '@/generated/';
import { toast } from "react-toastify";
import { useLogin } from "@/context/LoginContext";
import { useAuth } from "@/context/AuthProvider";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

const Login = () => {
    const router = useRouter();
    const { setEmail } = useLogin();
    const [loginMutation, { loading }] = useLoginMutation();
    const { setToken } = useAuth();
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (values: { email: string; password: string }) => {
        try {
            setEmail(values.email);
            const { data } = await loginMutation({
                variables: {
                    input: {
                        email: values.email.toLowerCase(),
                        password: values.password,
                        requiredRole: "admin",
                    },
                },
            });

            if (data?.login?.token) {
                localStorage.setItem("token", data.login.token);
                setToken(data.login.token);
                toast.success("Амжилттай нэвтэрлээ.");
                router.push("/request");
            } else {
                toast.success("Таны имэйл рүү нэг удаагийн код илгээлээ.");
                router.push("/sendOtp");
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : "";
            if (message.includes("Unauthorized")) {
                toast.error("Танд энэ хуудсанд нэвтрэх эрх байхгүй байна.");
            } else {
                toast.error("Алдаа гарлаа");
            }
        }
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('И-мэйл хаяг буруу байна')
            .required('И-мэйл хаяг оруулна уу')
            .matches(
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                'И-мэйл хаяг буруу байна'
            )
            .min(5, 'И-мэйл хаяг хамгийн багадаа 5 тэмдэгт байх ёстой')
            .max(50, 'И-мэйл хаяг хамгийн ихдээ 50 тэмдэгт байх ёстой'),
        password: Yup.string()
            .required('Нууц үг оруулна уу')
            .min(6, 'Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой'),
    });

    return (
        <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
            <Card className="w-full max-w-[448px] rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm sm:p-10">
                <Image src={"/logo.png"} alt="logo" width={120} height={120} className="mx-auto" />
                <h1 className="mt-6 text-center text-[28px] font-semibold leading-9 text-zinc-950">Нэвтрэх</h1>
                <Formik initialValues={{ email: '', password: '' }} validationSchema={validationSchema} onSubmit={handleLogin}>
                    {({ handleSubmit, handleChange, values, errors, touched }) => (
                        <Form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <Label className="text-[14px] font-medium tracking-[0.01em] text-zinc-700">И-мэйл хаяг</Label>
                                <div className="relative">
                                    <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-zinc-400" />
                                    <Input id="email" placeholder="name@example.com" name="email" onChange={handleChange} value={values.email} data-testid="email-input" className="h-12 rounded-xl border-zinc-200 bg-zinc-50 pl-11 pr-4 text-[16px] text-zinc-950 placeholder:text-zinc-400 focus-visible:border-zinc-950 focus-visible:ring-zinc-950/10" />
                                </div>
                                {touched.email && errors.email && <span className="text-sm text-red-500">{errors.email}</span>}
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                    <Label className="text-[14px] font-medium tracking-[0.01em] text-zinc-700">Нууц үг</Label>
                                    <button type="button" onClick={() => router.push('/forgotPassword')} className="text-[14px] font-medium text-zinc-950 hover:underline">
                                        Нууц үг мартсан
                                    </button>
                                </div>
                                <div className="relative">
                                    <Lock className="pointer-events-none absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-zinc-400" />
                                    <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" name="password" onChange={handleChange} value={values.password} data-testid="password-input" className="h-12 rounded-xl border-zinc-200 bg-zinc-50 pl-11 pr-11 text-[16px] text-zinc-950 placeholder:text-zinc-400 focus-visible:border-zinc-950 focus-visible:ring-zinc-950/10" />
                                    <button type="button" onClick={() => setShowPassword((s) => !s)} aria-label={showPassword ? "Нууц үг нуух" : "Нууц үг харах"} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 transition-colors hover:text-zinc-700">
                                        {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                                    </button>
                                </div>
                                {touched.password && errors.password && <span className="text-sm text-red-500">{errors.password}</span>}
                            </div>
                            <Button type="submit" className="h-12 w-full rounded-xl bg-zinc-950 text-[16px] font-medium text-white shadow-sm hover:bg-zinc-800" disabled={loading} >
                                {loading ? "Уншиж байна..." : "Нэвтрэх"}
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Card>
        </div>
    );
};

export default Login;
