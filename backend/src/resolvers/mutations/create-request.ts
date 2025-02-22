import { MutationResolvers } from "@/generated";
import { RequestModel } from "@/models/request.model";
export const createsRequest:MutationResolvers['createsRequest']= async(_,{email, requestType, requestDate,workPlace, principalName, startDate, endDate, optionalFile, optionalFileMeduuleg,result})=>{
    const newRequest = await RequestModel.create({email, requestType, requestDate,workPlace, principalName, startDate, endDate, optionalFile, optionalFileMeduuleg,result })
    return newRequest;
}