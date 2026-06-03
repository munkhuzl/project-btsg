import * as Mutation from './mutations';
import * as Query from './queries';
import { RequestTypeModel, FieldDefinition } from '@/models/requestType.model';
import { GlobalFieldModel } from '@/models/globalField.model';

// Requests created before the requestTypeId/fieldValues system used these
// legacy fields. The resolvers below normalize them into the new shape on read
// so old requests still fetch and display (no data migration required).
type LegacyRequest = {
    _id?: unknown;
    requestTypeId?: string;
    fieldValues?: { fieldId: string; value: string }[];
    attachments?: string[];
    requestType?: string;
    detailAboutRequest?: string;
    optionalFile?: string;
    optionalFileMeduuleg?: string;
    createdAt?: Date;
    updatedAt?: Date;
};

const LEGACY_TYPE_LABELS: Record<string, string> = {
    shortterm: "Богино хугацааны чөлөө",
    longterm: "Урт хугацааны чөлөө",
};

const LEGACY_DETAIL_FIELD_ID = "detailAboutRequest";

export const resolvers = {
    Mutation,
    Query,
    RequestType: {
        // Guarantee the non-null schema contract for legacy docs that lack it.
        requestTypeId: (parent: LegacyRequest) =>
            parent.requestTypeId ? String(parent.requestTypeId) : "",

        // New requests already store fieldValues; legacy requests carry their
        // content in `detailAboutRequest`, surfaced here as a single field value.
        fieldValues: (parent: LegacyRequest) => {
            if (parent.fieldValues && parent.fieldValues.length > 0) return parent.fieldValues;
            if (parent.detailAboutRequest) {
                return [{ fieldId: LEGACY_DETAIL_FIELD_ID, value: parent.detailAboutRequest }];
            }
            return [];
        },

        // Legacy requests stored files in optionalFile/optionalFileMeduuleg
        // rather than the attachments array.
        attachments: (parent: LegacyRequest) => {
            if (parent.attachments && parent.attachments.length > 0) return parent.attachments;
            return [parent.optionalFile, parent.optionalFileMeduuleg].filter(Boolean);
        },

        requestTypeDetail: async (parent: LegacyRequest) => {
            // Legacy request: synthesize a detail so the type name + detail text
            // render through the existing field-value display path.
            if (!parent.requestTypeId) {
                if (!parent.requestType && !parent.detailAboutRequest) return null;
                return {
                    _id: parent._id,
                    name: LEGACY_TYPE_LABELS[parent.requestType ?? ""] || parent.requestType || "Чөлөөний хүсэлт",
                    description: null,
                    fields: [{ id: LEGACY_DETAIL_FIELD_ID, label: "Дэлгэрэнгүй", type: "textarea", required: false }],
                    createdAt: parent.createdAt,
                    updatedAt: parent.updatedAt,
                };
            }
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