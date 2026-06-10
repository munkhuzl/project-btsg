import gql from "graphql-tag";

export const RequestTypeDefs = gql`
    type RequestFieldDefinition {
        id: String!
        label: String!
        type: String!
        required: Boolean!
    }

    type RequestTypeTemplate {
        _id: ID!
        name: String!
        description: String
        fields: [RequestFieldDefinition!]!
        createdAt: Date!
        updatedAt: Date!
    }

    type GlobalField {
        _id: ID!
        id: String!
        label: String!
        type: String!
        required: Boolean!
        createdAt: Date!
        updatedAt: Date!
    }

    type FieldValueType {
        fieldId: String!
        value: String!
    }

    type RequestType {
        _id: ID!
        email: String!
        firstname: String!
        lastname: String!
        userId: String!
        requestTypeId: String!
        requestTypeDetail: RequestTypeTemplate
        startTime: String!
        endTime: String!
        fieldValues: [FieldValueType!]!
        attachments: [String!]
        result: String!
        comment: String
        createdAt: Date!
        updatedAt: Date!
    }

    type RequestTypePop {
        _id: ID!
        email: User!
        requestType: String!
        message: String
        startTime: Date!
        endTime: Date!
        supervisorEmail: String
        result: String
        detailAboutRequest: String!
        comment: String
        optionalFile: String
        createdAt: Date!
        updatedAt: Date!
    }

    type OpenRequestType {
        _id: ID!
        email: String!
        requestType: String!
        startTime: Date
        endTime: Date
        supervisorEmail: String!
        result: String
        comment: String
        optionalFile: String
        detailAboutRequest: String!
        createdAt: Date!
        updatedAt: Date!
    }

    type GroupedRequests {
        requests: [RequestType]
    }

    type AllGroupedRequests {
        year: Int!
        month: Int!
        requests: [RequestType]!
    }

    input RequestFieldDefinitionInput {
        id: String!
        label: String!
        type: String!
        required: Boolean!
    }

    input CreateRequestTypeInput {
        name: String!
        description: String
        fields: [RequestFieldDefinitionInput!]!
    }

    input CreateGlobalFieldInput {
        id: String!
        label: String!
        type: String!
        required: Boolean!
    }

    input FieldValueInput {
        fieldId: String!
        value: String!
    }

    input SendRequestInput {
        email: String!
        firstname: String!
        lastname: String!
        userId: String!
        requestTypeId: String!
        startTime: String!
        endTime: String!
        fieldValues: [FieldValueInput!]!
        attachments: [String!]
    }

    type RequestSentRespone {
        message: String!
        success: Boolean!
    }

    type StatusChangedResponse {
        message: String
    }
`;
