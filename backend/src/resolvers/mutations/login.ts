import { MutationResolvers } from "@/generated/graphql";
import { UserModel, OTPModel } from "@/models";
import { generateHtmlTemplate } from "@/utils/generate-html-template";
import nodemailer from "nodemailer";

export const login: MutationResolvers['login'] = async (_:unknown, {input}) => {
    const {email} = input;
    const user = await UserModel.findOne({email});

    if(!user) throw new Error('User not found');

    // Check if there's an existing valid OTP
    const oldOTP = await OTPModel.findOne({ email });
    if (oldOTP && oldOTP.expirationDate > new Date()) {
        return {user, token: null}; // Return user but no token since OTP is already sent
    }

    // Delete expired OTP if exists
    if (oldOTP) {
        await OTPModel.deleteOne({ email });
    }

    // Generate and send new OTP
    const otp = generateOTP();
    await sendEmail(otp, email);

    // Save OTP to database
    await OTPModel.create({
        email,
        OTP: otp,
        expirationDate: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
    });

    return {user, message: 'Welcome'}; // Return user but no token since OTP needs to be verified
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

const sendEmail = (otp: string, email: string) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Your Login OTP',
        html: generateHtmlTemplate(otp),
    };
    
    transporter.sendMail(mailOptions).then(() => console.log(`OTP sent to ${email}: ${otp}`));
};
