import { QueryResolvers } from "@/generated/graphql";
import { UserModel } from "@/models";


export const getUser:QueryResolvers['getUser']=async(_, __, {userId})=>{
    if(!userId) throw new Error('User must be logged in');
    
    // If _id is provided, use it; otherwise use userId from contex
    
    const user = await UserModel.findById(userId);
    if (!user) throw new Error('User not found');
    
    return user;
};
