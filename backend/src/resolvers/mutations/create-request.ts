
import { MutationResolvers } from "@/generated/graphql";
import { RequestModel } from "@/models/request.model";
export const createsRequest:MutationResolvers['createsRequest']= async(_,{email,workPlace, principalName, startDate, endDate, optionalFile, optionalFileMeduuleg,result})=>{
    const newRequest = await RequestModel.create({email,workPlace, principalName, startDate, endDate, optionalFile, optionalFileMeduuleg,result ,})
    return newRequest;
}