import gql from "graphql-tag";

export const RequestTypeDefs = gql`
  type RequestType {
    _id: ID!
    email: String!
    firstname: String!
    lastName: String!
    workPlace: String!
    principalName: String!
    position: String!
    optionalFile: String!
    optionalFileMeduuleg: String!
    startDate: String!
    endDate: String!
    result: String!
  }
  type User {
    _id: ID!
    email: String!
    password: String!
    firstname: String
    lastname: String
    position: String
    phoneNumber: String
    otp: String
    passwordResetToken: String
    passwordResetTokenExpire: String
    createdAt: Date!
    updatedAt: Date!
  }
  type RequestTypePop {
    _id: ID!
    email: User!
    requestType: String!
    message: String!
    requestDate: Date!
    startTime: Date!
    endTime: Date!
    supervisorEmail: String!
    result: String!
    comment: String!
    optionalFile: String!
  }

  type OpenRequestType {
    _id: ID!
    email: String!
    requestType: String!
    message: String!
    requestDate: Date!
    startTime: Date
    endTime: Date
    supervisorEmail: String!
    result: String
    comment: String
    optionalFile: String
    userName: String!
    createdAt: Date!
    updatedAt: Date!
  }

  type GroupedRequests {
    _id: String!
    requests: [RequestType]
  }
  type AllGroupedRequests {
    year: Int!
    month: Int!
    requests: [RequestType]!
  }
  type Mutation {
    createsRequest(
      email: String!
      firstName: String
      lastName: String!
      workPlace: String!
      principalName: String!
      position: String!
      optionalFile: String!
      optionalFileMeduuleg: String!
      startDate: String!
      endDate: String!
      result: String!
    ): RequestType
  }
  type Query {
    getRequestById(_id: ID): RequestType
    getRequests(
      email: String
      startDate: Date
      endDate: Date
      status: String
    ): [GroupedRequests!]
    openRequest(_id: ID): OpenRequestType
  }
`;
