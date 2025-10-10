import gql from 'graphql-tag';

export const OTPTypeDefs = gql`
  type OTPType {
    _id: ID!
    OTP: String!
    email: String!
    expirationDate: Date!
  }
  
  type OTPResponse {
    message: String!
    token: String!
  }
`;
