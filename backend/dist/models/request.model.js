"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestModel = void 0;
const mongoose_1 = require("mongoose");
const RequestSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    requestType: {
        type: String,
        enum: ['longterm', 'shortterm', 'mediumterm'],
        default: 'shortterm',
    },
    startTime: String,
    endTime: String,
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
    },
    position: String,
    optionalFile: {
        type: String,
    },
    optionalFileMeduuleg: { type: String, required: true },
    result: {
        type: String,
        enum: ['pending', 'declined', 'accepted'],
        default: 'pending',
    },
    supervisorEmail: String,
    detailAboutRequest: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});
exports.RequestModel = mongoose_1.models.Request || (0, mongoose_1.model)("Request", RequestSchema);
