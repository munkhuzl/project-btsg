"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestTypeDefs = void 0;
const graphql_tag_1 = __importDefault(require("graphql-tag"));
exports.RequestTypeDefs = (0, graphql_tag_1.default) `
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
