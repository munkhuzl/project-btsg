import {QueryResolvers} from "@/generated/graphql";
import {RequestModel} from "@/models";

export const getAllRequests: QueryResolvers['getAllRequests'] = async(_, __, { userId })=> {
    if(!userId) throw new Error('User must logged in');
    return RequestModel.find();
}