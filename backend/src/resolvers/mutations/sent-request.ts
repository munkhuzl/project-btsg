import { MutationResolvers } from "@/generated/graphql";
import { RequestModel } from "@/models/request.model";
import {UserModel} from "@/models";

export const sentRequest:MutationResolvers['sentRequest']= async(_,{ input }, {userId})=>{
    const checkUser = await UserModel.findById(userId);

    if(!checkUser) throw new Error('User must be logged in');

    try {
        await RequestModel.create({...input});
        return {
            message: "Request sent!",
            success: true
        };
    }catch (e){
        console.log(e);
        return {
            message:"Failed to create request",
            error: e
        }
    }
};