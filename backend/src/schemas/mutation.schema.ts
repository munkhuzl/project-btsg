import gql from "graphql-tag";

export const MutationTypeDefs = gql`
    type Mutation {
        signUp(input: SignUpInput!): User!
        login(input: LoginInput!): AuthResponse!
        createsOTP(email: String!): OTPType
        checkOTP(email: String!, OTP: String!): String
        sentRequest(input: SendRequestInput!): RequestSentRespone!
    }

    type Query {
        getUser: [User!]!
        getRequestById(_id: ID!): RequestType!
        getRequests(
            email: String
            startDate: Date
            endDate: Date
            status: String
        ): [GroupedRequests!]
        getAllRequests: [RequestType!]!
        openRequest(_id: ID): OpenRequestType
    }

`