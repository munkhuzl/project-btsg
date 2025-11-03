"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectDb = async () => {
    try {
        const uri = process.env.MONGO_URI;
        if (!uri)
            throw new Error("Mongo_Uri is not defined");
        await mongoose_1.default.connect(uri);
        console.log('Connected');
    }
    catch (error) {
        console.error('Failed to connect database', error);
        process.exit(1);
    }
};
exports.connectDb = connectDb;
