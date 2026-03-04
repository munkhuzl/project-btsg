import { MutationResolvers } from "@/generated/graphql";
import { UserModel, OTPModel } from "@/models";
import { generateHtmlTemplate } from "@/utils/generate-html-template";
import { generateToken } from "@/utils/generate-token";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";

export const login: MutationResolvers["login"] = async (
  _: unknown,
  { input },
) => {
  const { email, password } = input;
  const user = await UserModel.findOne({ email });

  if (!user) throw new Error("User not found");

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error("Invalid password");

  // If email is already verified, return token directly
  if (user.isEmailVerified) {
    const token = generateToken({ id: user._id });
    return { user, message: "Login successful", token };
  }

  // First login: send OTP
  // Always remove any existing OTP for this email (expired or not)
  const oldOTP = await OTPModel.findOne({ email });
  if (oldOTP) {
    console.log("Removing existing OTP before creating a new one", oldOTP);
    await OTPModel.deleteOne({ email });
  }

  // Generate and send new OTP
  const otp = generateOTP();
  console.log("Generated OTP", otp);
  await sendEmail(otp, email);

  // Save OTP to database
  const createdOTP = await OTPModel.create({
    email,
    OTP: otp,
    expirationDate: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
  });
  console.log("createdOTP", createdOTP);

  return { user, token: null, message: "OTP sent to your email" };
};

const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
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
    subject: "Your Login OTP",
    html: generateHtmlTemplate(otp),
  };

  await transporter.sendMail(mailOptions);
  console.log(`OTP sent to ${email}: ${otp}`);
};
