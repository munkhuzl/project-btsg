"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRequestByUserID = void 0;
const models_1 = require("@/models");
const getRequestByUserID = async (_, __, { userId }) => {
    if (!userId)
        throw new Error('User must logged in');
    return models_1.RequestModel.find({ userId });
};
exports.getRequestByUserID = getRequestByUserID;
