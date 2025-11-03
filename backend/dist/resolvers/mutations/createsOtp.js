"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createsOTP = void 0;
const models_1 = require("@/models");
const generate_html_template_1 = require("@/utils/generate-html-template");
const nodemailer_1 = __importDefault(require("nodemailer"));
const createsOTP = async (_, { email }) => {
    const user = await models_1.UserModel.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }
    const oldOTP = await models_1.OTPModel.findOne({ email });
    console.log(oldOTP);
    if (oldOTP) {
        if (oldOTP.expirationDate > new Date()) {
            return oldOTP;
        }
        await models_1.OTPModel.deleteOne({ email });
    }
    const otp = generateOTP();
    await sendEmail(otp, email);
    const otpObj = await models_1.OTPModel.create({
        email,
        OTP: otp,
        expirationDate: new Date(Date.now() + 10 * 60 * 1000),
    });
    return otpObj;
};
exports.createsOTP = createsOTP;
const generateOTP = () => {
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    return otp;
};
const transporter = nodemailer_1.default.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    auth: {
        user: 'apikey',
        pass: process.env.SEND_GRID_EMAIL_KEY,
    },
});
const mailOptions = {
    from: 'munkhzul.odonkhuu@gmail.com', // This should be your verified sender email (can be any email)
    to: 'bolzop.zulaa@gmail.com', // The recipient's email
    subject: 'Test Email',
    html: 'This is a test email sent using Nodemailer and SendGrid.',
    // html: generateHtmlTemplate({otp}),
};
const sendEmail = (otp, email) => {
    console.log(otp);
    transporter.sendMail({ ...mailOptions, html: (0, generate_html_template_1.generateHtmlTemplate)(otp), to: email }).then(() => console.log(otp));
};
