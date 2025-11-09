import {MutationResolvers} from "@/generated/graphql";
import {RequestModel} from "@/models";

export const changeReStatus: MutationResolvers['changeReStatus'] = async (_, { result, _id }, {userId})=>{
    if(!userId){
        return {
            message: 'User must be logged in',
        }
    }

    try {
        // Find the first request with pending status and update it to success
        const updatedRequest = await RequestModel.findOneAndUpdate(
            { result: 'pending', _id: _id }, // Find a request with pending status
            { result: result }, // Update to success
            { new: true } // Return the updated document
        );

        if (!updatedRequest) {
            return {
                message: 'No pending requests found to update'
            }
        }

        return {
            message: `Request ${updatedRequest._id} status changed to ${result}`
        }
    } catch (error) {
        console.error('Error updating request status:', error);
        return {
            message: 'Failed to update request status'
        }
    }
}