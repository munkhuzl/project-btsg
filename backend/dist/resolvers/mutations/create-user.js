"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = void 0;
const models_1 = require("@/models");
const signUp = async (_, { input }) => {
    const { email, password } = input;
    const findUser = await models_1.UserModel.findOne({ email });
    if (findUser)
        throw new Error("User already signed up.");
    return await models_1.UserModel.create({
        email,
        password,
    });
};
exports.signUp = signUp;
