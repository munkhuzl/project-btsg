"use client";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useResetPasswordMutation } from "@/generated/";
import { toast } from "react-toastify";
import { useLogin } from "@/context/LoginContext";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const ResetPassword = () => {
  const router = useRouter();
  const { email } = useLogin();
  const [resetPassword, { loading }] = useResetPasswordMutation();
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async () => {
    if (otp.length !== 4) {
      toast.error("OTP кодоо бүрэн оруулна уу.");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой.");
      return;
    }

    try {
      const { data } = await resetPassword({
        variables: { email, otp, newPassword },
      });

      if (data?.resetPassword?.message) {
        toast.success("Нууц үг амжилттай солигдлоо.");
        router.push("/login");
      }
    } catch {
      toast.error("Алдаа гарлаа. Дахин оролдоно уу.");
    }
  };

  return (
    <div className="my-24">
      <Card className="bg-white md:w-[500px] w-[350px] h-full m-auto mx-auto p-12">
        <h1 className="font-bold text-center mb-6 mx-4">Нууц үг шинэчлэх</h1>
        <Image
          src={"/logo.png"}
          alt="logo"
          width={150}
          height={150}
          className="mx-auto"
        />
        <div className="flex flex-col items-center mt-8">
          <Label className="my-4">И-мэйлээ шалгаад код оо оруулна уу.</Label>
          <InputOTP
            maxLength={4}
            onChange={(value) => setOtp(value)}
            className="mx-auto"
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <div className="mt-4 mx-4 flex flex-col gap-2">
          <Label>Шинэ нууц үг</Label>
          <Input
            type="password"
            placeholder="Шинэ нууц үг"
            className="mt-2"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <Button
          className="my-6 w-full"
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? "Уншиж байна..." : "Нууц үг шинэчлэх"}
        </Button>
        <div
          className="text-gray-200 text-center hover:underline hover:font-bold hover:text-black cursor-pointer"
          onClick={() => router.push("/login")}
        >
          Нэвтрэх хуудас руу буцах
        </div>
      </Card>
    </div>
  );
};

export default ResetPassword;
