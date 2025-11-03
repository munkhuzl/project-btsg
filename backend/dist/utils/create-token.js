"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = (user) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }
    const payload = {
        userId: user._id,
        username: user.userName,
        role: user.role,
        email: user.email
    };
    // const options = {
    //   expiresIn: '3h',
    // };
    // Create the token
    const token = jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    return token;
};
exports.createToken = createToken;
