import { MutationResolvers } from "@/generated/graphql";
import { UserModel, OTPModel } from "@/models";
import { generateHtmlTemplate } from "@/utils/generate-html-template";
import nodemailer from "nodemailer";

export const forgotPassword: MutationResolvers["forgotPassword"] = async (
  _: unknown,
  { email },
) => {
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error("User not found");

  await OTPModel.deleteOne({ email });

  const otp = Math.floor(1000 + Math.random() * 9000).toString();

  await sendEmail(otp, email);

  await OTPModel.create({
    email,
    OTP: otp,
    expirationDate: new Date(Date.now() + 10 * 60 * 1000),
  });

  return { message: "OTP sent to your email" };
};

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "e69808220@gmail.com",
    pass: "vrpn mxqp qmpl bcjz",
  },
});

const sendEmail = async (otp: string, email: string) => {
  const mailOptions = {
    from: "e69808220@gmail.com",
    to: email,
    subject: "Password Reset OTP",
    html: generateHtmlTemplate(otp),
  };

  await transporter.sendMail(mailOptions);
};
