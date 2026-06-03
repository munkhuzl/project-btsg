import * as Mutation from './mutations';
import * as Query from './queries';
import { RequestTypeModel, FieldDefinition } from '@/models/requestType.model';
import { GlobalFieldModel } from '@/models/globalField.model';

export const resolvers = {
    Mutation,
    Query,
    RequestType: {
        requestTypeDetail: async (parent: { requestTypeId?: string }) => {
            if (!parent.requestTypeId) return null;
            try {
                const template = await RequestTypeModel.findById(parent.requestTypeId);
                if (!template) return null;

                // Merge independent global fields into the template's fields so
                // request-detail views can resolve labels for global field values
                // (which are stored generically by fieldId on the request).
                const globalFields = await GlobalFieldModel.find();
                const existingIds = new Set(template.fields.map((f: FieldDefinition) => f.id));
                const extraFields = globalFields.filter((g) => !existingIds.has(g.id));

                return {
                    ...template.toObject(),
                    fields: [...template.fields, ...extraFields],
                };
            } catch (error) {
                console.error("Error populating requestTypeDetail:", error);
                return null;
            }
        }
    }
};