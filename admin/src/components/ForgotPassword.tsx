"use client";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { useRouter } from "next/navigation";
import { useForgotPasswordMutation } from "@/generated/";
import { toast } from "react-toastify";
import { useLogin } from "@/context/LoginContext";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("И-мэйл хаяг буруу байна")
    .required("И-мэйл хаяг оруулна уу"),
});

const ForgotPassword = () => {
  const router = useRouter();
  const { setEmail } = useLogin();
  const [forgotPassword, { loading, error }] = useForgotPasswordMutation();

  const handleSubmit = async (values: { email: string }) => {
    try {
      const { data } = await forgotPassword({
        variables: { email: values.email },
      });

      if (data?.forgotPassword?.message) {
        setEmail(values.email);
        toast.success("Таны имэйл рүү нэг удаагийн код илгээлээ.");
        router.push("/resetPassword");
      }
    } catch {
      toast.error("Алдаа гарлаа. Дахин оролдоно уу." + error?.message);
    }
  };

  return (
    <div className="my-24">
      <Card className="bg-white md:w-[500px] w-[350px] h-full m-auto mx-auto p-12">
        <h1 className="font-bold text-center mb-6 mx-4">Нууц үг сэргээх</h1>
        <Image
          src={"/logo.png"}
          alt="logo"
          width={150}
          height={150}
          className="mx-auto"
        />
        <Formik
          initialValues={{ email: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, handleChange, values, errors, touched }) => (
            <Form onSubmit={handleSubmit}>
              <div className="mt-8 mx-4 flex flex-col gap-2">
                <Label className="mt-4">И-мэйл хаяг</Label>
                <Input
                  id="email"
                  placeholder="Email"
                  className="mt-2"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                />
                {touched.email && errors.email && (
                  <span className="text-red-500 text-sm">{errors.email}</span>
                )}
              </div>
              <Button
                type="submit"
                className="my-6 w-full"
                disabled={loading}
              >
                {loading ? "Уншиж байна..." : "Код илгээх"}
              </Button>
              <div
                className="text-gray-200 text-center hover:underline hover:font-bold hover:text-black cursor-pointer"
                onClick={() => router.push("/login")}
              >
                Нэвтрэх хуудас руу буцах
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default ForgotPassword;
