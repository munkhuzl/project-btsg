"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
const models_1 = require("@/models");
const getUser = async (_, { _id }, { userId }) => {
    if (!userId)
        throw new Error('User must be logged in');
    // If _id is provided, use it; otherwise use userId from context
    const targetUserId = _id || userId;
    const user = await models_1.UserModel.findById(targetUserId);
    if (!user)
        throw new Error('User not found');
    return user;
};
exports.getUser = getUser;
