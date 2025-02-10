import gql from 'graphql-tag';

export const typeDefs = gql`
scalar Date
  type User {
    _id: ID!
    email: String!
    password: String!
    firstname:String
    lastname:String
    role: String
    phoneNumber: String
    otp: String
    passwordResetToken: String
    passwordResetTokenExpire: String
    createdAt: Date!
    updatedAt: Date!
  }
  type AuthResponse {
    user: User!
    token: String!
  }
  input LoginInput {
    email: String!
    password: String!
  }
  type Query {
    getUser: User!
  }
  type Mutation {
    signUp(email: String!, password: String!): User!
    login(input: LoginInput!): AuthResponse!
  }
`;