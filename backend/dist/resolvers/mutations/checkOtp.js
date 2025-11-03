"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkOTP = void 0;
const models_1 = require("@/models");
const generate_token_1 = require("@/utils/generate-token");
const checkOTP = async (_, { email, OTP }) => {
    const findOtp = await models_1.OTPModel.findOne({ OTP });
    if (!findOtp) {
        throw new Error('Invalid OTP');
    }
    if (findOtp.created_at < new Date()) {
        throw new Error('OTP is expired');
    }
    await models_1.OTPModel.deleteOne({ email });
    const user = await models_1.UserModel.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }
    const token = (0, generate_token_1.generateToken)({ id: user._id });
    return {
        message: 'Welcome',
        token: token,
    };
};
exports.checkOTP = checkOTP;
