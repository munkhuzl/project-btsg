"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sentRequest = void 0;
const request_model_1 = require("@/models/request.model");
const models_1 = require("@/models");
const sentRequest = async (_, { input }, { userId }) => {
    const checkUser = await models_1.UserModel.findById(userId);
    if (!checkUser)
        throw new Error('User must be logged in');
    try {
        await request_model_1.RequestModel.create({ ...input });
        return {
            message: "Request sent!",
            success: true
        };
    }
    catch (e) {
        console.log(e);
        return {
            message: "Failed to create request",
            error: e
        };
    }
};
exports.sentRequest = sentRequest;
