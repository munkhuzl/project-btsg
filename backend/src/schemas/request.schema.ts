import gql from "graphql-tag";

export const RequestTypeDefs = gql`
    type RequestType {
        _id: ID!
        email: String!
        firstname: String!
        userId: String!
        lastname: String!
        workPlace: WorkPlaceType
        school: SchoolType
        requestDate: String
        position: String
        requestType: String
        startTime: String
        endTime: String
        optionalFile: String
        optionalFileMeduuleg: String!
        result: String
        detailAboutRequest: String!
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

    input SendRequestInput {
        email: String!
        firstname: String!
        lastname: String!
        userId: String!
        workPlace: WorkPlaceInput
        requestDate: String
        school: SchoolInput
        position: String
        requestType: String
        startTime: String
        endTime: String
        optionalFile: String
        optionalFileMeduuleg: String!
        detailAboutRequest: String!
    }
    type RequestSentRespone {
        message: String
    }
    type StatusChangedResponse {
        message: String
    }
`;
