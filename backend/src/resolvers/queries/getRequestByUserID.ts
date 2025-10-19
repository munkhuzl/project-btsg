import {RequestModel} from "@/models";
import {QueryResolvers} from "@/generated/graphql";

export const getRequestByUserID: QueryResolvers['getRequestByUserID'] = async(_, __, {userId})=> {
    if(!userId) throw new Error('User must logged in');
    return RequestModel.find({userId});
}