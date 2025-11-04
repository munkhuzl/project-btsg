import gql from "graphql-tag";

export const MutationTypeDefs = gql`
    type Mutation {
        signUp(input: SignUpInput!): User!
        login(input: LoginInput!): AuthResponse!
        createsOTP(email: String!): OTPType!
        checkOTP(email: String!, OTP: String!): OTPResponse!
        sentRequest(input: SendRequestInput!): RequestSentRespone!
        changeReStatus(result: String!, _id: ID!): StatusChangedResponse!
    }

    type Query {
        getUser: User!
        getRequestById(_id: ID!): RequestType!
        getRequestByUserID: [RequestType!]!
        getRequests(
            email: String
            result: String
        ): [AllGroupedRequests!]!
        getAllRequests: [RequestType!]!
        openRequest(_id: ID): OpenRequestType
    }

`