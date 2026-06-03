import * as Mutation from './mutations';
import * as Query from './queries';
import { RequestTypeModel } from '@/models/requestType.model';

export const resolvers = {
    Mutation,
    Query,
    RequestType: {
        requestTypeDetail: async (parent: { requestTypeId?: string }) => {
            if (!parent.requestTypeId) return null;
            try {
                return await RequestTypeModel.findById(parent.requestTypeId);
            } catch (error) {
                console.error("Error populating requestTypeDetail:", error);
                return null;
            }
        }
    }
};