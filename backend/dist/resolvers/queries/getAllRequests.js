"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllRequests = void 0;
const models_1 = require("@/models");
const getAllRequests = async (_, __, { userId }) => {
    if (!userId)
        throw new Error('User must logged in');
    return models_1.RequestModel.find();
};
exports.getAllRequests = getAllRequests;
