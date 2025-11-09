"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
const models_1 = require("@/models");
const getUser = async (_, __, { userId }) => {
    if (!userId)
        throw new Error('User must be logged in');
    // If _id is provided, use it; otherwise use userId from contex
    const user = await models_1.UserModel.findById(userId);
    if (!user)
        throw new Error('User not found');
    return user;
};
exports.getUser = getUser;
