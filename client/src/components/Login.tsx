"use client";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/generated/";
import { toast } from "react-toastify";
import { useLogin } from "@/context/LoginContext";

const Login = () => {
  const router = useRouter();
  const { setEmail } = useLogin();
  const [loginMutation, { loading, error }] = useLoginMutation();

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      setEmail(values.email);
      const { data } = await loginMutation({
        variables: {
          input: {
            email: values.email,
            password: values.password,
          },
        },
      });

      if (data?.login?.token) {
        localStorage.setItem("token", data.login.token);
        toast.success("Амжилттай нэвтэрлээ.");
        router.push("/");
      } else {
        toast.success("Таны имэйл рүү нэг удаагийн код илгээлээ.");
        router.push("/sendOtp");
      }
    } catch (err) {
      toast.error("Алдаа гарлаа");
      console.error("Алдаа гарлаа:", err, error?.message);
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("И-мэйл хаяг буруу байна")
      .required("И-мэйл хаяг оруулна уу")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "И-мэйл хаяг буруу байна",
      )
      .min(5, "И-мэйл хаяг хамгийн багадаа 5 тэмдэгт байх ёстой")
      .max(50, "И-мэйл хаяг хамгийн ихдээ 50 тэмдэгт байх ёстой"),
    password: Yup.string()
      .required("Нууц үг оруулна уу")
      .min(6, "Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой"),
  });

  return (
    <div className="my-24">
      <Card className="bg-white md:w-[500px] w-[350px] h-full m-auto mx-auto p-12">
        <h1 className="font-bold text-center mb-6 mx-4">Нэвтрэх</h1>
        <Image
          src={"/logo.png"}
          alt="logo"
          width={150}
          height={150}
          className="mx-auto"
        />
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
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
                  data-testid="email-input"
                />
                {touched.email && errors.email && (
                  <span className="text-red-500">{errors.email}</span>
                )}
              </div>
              <div className="mt-4 mx-4 flex flex-col gap-2">
                <Label>Нууц үг</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Нууц үг"
                  className="mt-2"
                  name="password"
                  onChange={handleChange}
                  value={values.password}
                  data-testid="password-input"
                />
                {touched.password && errors.password && (
                  <span className="text-red-500">{errors.password}</span>
                )}
              </div>
              <div
                className="text-gray-200 text-center hover:underline hover:font-bold hover:text-black mt-4"
                onClick={() => {
                  router.push("/signup");
                }}
              >
                Бүртгүүлэх
              </div>
              <Button type="submit" className="my-6 w-full" disabled={loading}>
                {loading && <p className="text-xs">Уншиж байна...</p>}
                Нэвтрэх
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default Login;
