import { QueryResolvers } from "@/generated";
import User from "../../models/userModel"

export const getUser:QueryResolvers['getUser']= async (_, __, {userId})=>{
    if(!userId) throw new Error('User not found');
        const user=await User.findById(userId);
        return user;
};