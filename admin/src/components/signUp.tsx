"use client";

import Image from "next/image";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { useRouter } from "next/navigation";
import { useSignUpMutation } from "@/generated";
import { toast } from "react-toastify";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

const SignUp = () => {
  const router = useRouter();
  const [signUpMutation, { loading, error }] = useSignUpMutation();
  const [showPassword, setShowPassword] = useState(false);

  const register = async (values: { password: string; email: string }) => {
    try {
      await signUpMutation({
        variables: {
          input: {
            email: values.email.toLowerCase(),
            password: values.password,
          },
        },
      }).then(() => {
        toast.success("Хэрэглэгч амжилттай бүртгэгдлээ.");
        router.push("/login");
      });
    } catch {
      toast.error("Алдаа гарлаа" + error?.message);
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("И-мэйл хаяг буруу байна")
      .email("И-мэйл хаяг буруу байна")
      .required("И-мэйл хаяг оруулна уу")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "И-мэйл хаяг буруу байна",
      )
      .min(5, "И-мэйл хаяг хамгийн багадаа 5 тэмдэгт байх ёстой")
      .max(50, "И-мэйл хаяг хамгийн ихдээ 50 тэмдэгт байх ёстой"),
  });
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-[448px] rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm sm:p-10">
        <Image
          src={"/logo.png"}
          alt="logo"
          width={120}
          height={120}
          className="mx-auto"
        />
        <h1 className="mt-6 text-center text-[28px] font-semibold leading-9 text-zinc-950">
          Бүртгүүлэх
        </h1>
        <Formik
          initialValues={{ password: "", email: "" }}
          validationSchema={validationSchema}
          onSubmit={register}
        >
          {({ handleSubmit, handleChange, values }) => (
            <Form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <Label className="text-[14px] font-medium tracking-[0.01em] text-zinc-700">
                  И-мэйл хаяг
                </Label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-zinc-400" />
                  <Input
                    id="email"
                    placeholder="name@example.com"
                    name="email"
                    onChange={handleChange}
                    value={values.email}
                    className="h-12 rounded-xl border-zinc-200 bg-zinc-50 pl-11 pr-4 text-[16px] text-zinc-950 placeholder:text-zinc-400 focus-visible:border-zinc-950 focus-visible:ring-zinc-950/10"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-[14px] font-medium tracking-[0.01em] text-zinc-700">
                  Нууц үг
                </Label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-zinc-400" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    onChange={handleChange}
                    value={values.password}
                    id="password"
                    className="h-12 rounded-xl border-zinc-200 bg-zinc-50 pl-11 pr-11 text-[16px] text-zinc-950 placeholder:text-zinc-400 focus-visible:border-zinc-950 focus-visible:ring-zinc-950/10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={showPassword ? "Нууц үг нуух" : "Нууц үг харах"}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 transition-colors hover:text-zinc-700"
                  >
                    {showPassword ? (
                      <EyeOff className="size-5" />
                    ) : (
                      <Eye className="size-5" />
                    )}
                  </button>
                </div>
              </div>
              <Button
                type="submit"
                className="h-12 w-full rounded-xl bg-zinc-950 text-[16px] font-medium text-white shadow-sm hover:bg-zinc-800"
                disabled={loading}
              >
                Бүртгүүлэх
              </Button>
              <button
                type="button"
                onClick={() => router.push("/login")}
                className="text-center text-[14px] font-semibold text-zinc-950 hover:underline"
              >
                Нэвтрэх
              </button>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default SignUp;
