import gql from 'graphql-tag';

export const OTPTypeDefs = gql`
  type OTPType {
    _id: ID!
    otp: String!
    email: String!
    expirationDate: Date!
  }
  
  type OTPResponse {
    message: String
    otp: String
  }
`;
