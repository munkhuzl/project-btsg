"use client";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import * as Yup from "yup";
import { Formik, Form, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/generated/";
import { toast } from "react-toastify";
import { useLogin } from "@/context/LoginContext";
import { useAuth } from "@/context/AuthProvider";

type LoginValues = {
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter();
  const { setEmail } = useLogin();
  const [loginMutation, { loading }] = useLoginMutation();
  const { setToken } = useAuth();

  const handleLogin = async (
    values: LoginValues,
    { setFieldError }: FormikHelpers<LoginValues>  // ✅ setFieldError нэмэгдлээ
  ) => {
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
        setToken(data.login.token);
        toast.success("Амжилттай нэвтэрлээ.");
        router.push("/createNewRequest");
      } else {
        toast.success("Таны имэйл рүү нэг удаагийн код илгээлээ.");
        router.push("/sendOtp");
      }
    } catch (error: any) {
      // ✅ GraphQL эсвэл серверийн алдааны мессежийг шалгана
      const message: string =
        error?.graphQLErrors?.[0]?.message ||
        error?.message ||
        "";

      // ✅ Нууц үгтэй холбоотой алдаа бол field дээр гаргана
      if (
        message.toLowerCase().includes("password") ||
        message.toLowerCase().includes("нууц үг") ||
        message.toLowerCase().includes("invalid") ||
        message.toLowerCase().includes("credentials") ||
        message.toLowerCase().includes("буруу")
      ) {
        setFieldError("password", "Нууц үг буруу байна");
      } else {
        // Бусад алдаанд toast харуулна
        toast.error("Алдаа гарлаа. Дахин оролдоно уу.");
      }
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("И-мэйл хаяг буруу байна")
      .required("И-мэйл хаяг оруулна уу")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "И-мэйл хаяг буруу байна"
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
          onSubmit={handleLogin}  // ✅ FormikHelpers автоматаар дамжна
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
                  <span className="text-red-500 text-sm">{errors.email}</span>
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
                {/* ✅ touched шаардлагагүй — серверийн алдаа ч гарна */}
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password}
                  </span>
                )}
              </div>
              <div
                className="text-gray-200 text-center hover:underline hover:font-bold hover:text-black mt-4 cursor-pointer"
                onClick={() => router.push("/signup")}
              >
                Бүртгүүлэх
              </div>
              <Button
                type="submit"
                className="my-6 w-full"
                disabled={loading}
              >
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
