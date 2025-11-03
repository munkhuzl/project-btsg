"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    position: String,
    phoneNumber: String,
    otp: {
        type: String,
        default: null,
    },
    passwordResetToken: { type: String, default: "" },
    passwordResetTokenExpire: { type: Date, default: undefined },
    age: Number,
    birthDate: Date,
    home_address: String,
    workPlace: {
        city: String,
        state: String,
        company_name: String,
        principal_name: String,
    },
    school: {
        city: String,
        state: String,
        school_number: String,
        class: String,
    }
}, {
    timestamps: true,
});
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next(); // 🚫 Prevents moving on to hashing
    }
    try {
        this.password = await bcrypt_1.default.hash(this.password, 10);
        next();
    }
    catch (error) {
        console.error(error);
    }
});
exports.UserModel = mongoose_1.models.User || (0, mongoose_1.model)("User", userSchema);
