"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const models_1 = require("@/models");
const generate_html_template_1 = require("@/utils/generate-html-template");
const nodemailer_1 = __importDefault(require("nodemailer"));
const login = async (_, { input }) => {
    const { email } = input;
    const user = await models_1.UserModel.findOne({ email });
    if (!user)
        throw new Error('User not found');
    // Check if there's an existing valid OTP
    const oldOTP = await models_1.OTPModel.findOne({ email });
    if (oldOTP && oldOTP.expirationDate > new Date()) {
        return { user, token: null }; // Return user but no token since OTP is already sent
    }
    // Delete expired OTP if exists
    if (oldOTP) {
        await models_1.OTPModel.deleteOne({ email });
    }
    // Generate and send new OTP
    const otp = generateOTP();
    await sendEmail(otp, email);
    // Save OTP to database
    await models_1.OTPModel.create({
        email,
        OTP: otp,
        expirationDate: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
    });
    return { user, message: 'Welcome' }; // Return user but no token since OTP needs to be verified
};
exports.login = login;
const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
};
const transporter = nodemailer_1.default.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.SEND_GRID_EMAIL_KEY,
    },
});
const sendEmail = (otp, email) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Your Login OTP',
        html: (0, generate_html_template_1.generateHtmlTemplate)(otp),
    };
    transporter.sendMail(mailOptions).then(() => console.log(`OTP sent to ${email}: ${otp}`));
};
