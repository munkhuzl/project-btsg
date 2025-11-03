"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OTPModel = void 0;
const mongoose_1 = require("mongoose");
const OTPSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
    },
    OTP: {
        type: String,
        required: true
    },
    expirationDate: {
        type: Date,
        required: true,
    }
}, {
    timestamps: true,
});
exports.OTPModel = mongoose_1.models.OTP || (0, mongoose_1.model)('OTP', OTPSchema);
