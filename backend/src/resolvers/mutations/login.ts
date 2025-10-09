import { MutationResolvers } from "@/generated/graphql";
import { UserModel } from "@/models";
import bcrypt from "bcrypt";
import { generateToken } from "@/utils/generate-token";


export const login: MutationResolvers['login'] = async (_:unknown, {input}) => {
    const {email, password}=input;
    const user=await UserModel.findOne({email});

    if(!user)throw new Error('User not found');

    const isCheckPass= bcrypt.compare(password, user.password);

    if(!isCheckPass) throw new Error('Email or password is incorrect');

    const token=generateToken({id:user._id});

    return {user, token};
}
