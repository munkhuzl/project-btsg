"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (typeof decoded === "object" && "role" in decoded) {
            return decoded;
        }
        return null;
    }
    catch (error) {
        console.error("Token verification failed:", error);
        return null;
    }
};
const checkToken = (roles, context) => {
    const token = context.req.headers.get("authorization");
    if (!token)
        return undefined;
    const decoded = verifyToken(token);
    if (!decoded)
        return undefined;
    return roles.includes(decoded === null || decoded === void 0 ? void 0 : decoded.role) || false;
};
exports.checkToken = checkToken;
