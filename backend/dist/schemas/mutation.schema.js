"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MutationTypeDefs = void 0;
const graphql_tag_1 = __importDefault(require("graphql-tag"));
exports.MutationTypeDefs = (0, graphql_tag_1.default) `
    type Mutation {
        signUp(input: SignUpInput!): User!
        login(input: LoginInput!): AuthResponse!
        createsOTP(email: String!): OTPType!
        checkOTP(email: String!, OTP: String!): OTPResponse!
        sentRequest(input: SendRequestInput!): RequestSentRespone!
        changeReStatus(result: String!, _id: ID!): StatusChangedResponse!
    }

    type Query {
        getUser(_id: ID!): User!
        getRequestById(_id: ID!): RequestType!
        getRequestByUserID: [RequestType!]!
        getRequests(
            email: String
            result: String
        ): [AllGroupedRequests!]!
        getAllRequests: [RequestType!]!
        openRequest(_id: ID): OpenRequestType
    }

`;
