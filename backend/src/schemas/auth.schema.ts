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
    position: String
    phoneNumber: String
    otp: String
    passwordResetToken: String
    passwordResetTokenExpire: String
    age: Int
    birthDate: Date
    home_address: String
    workPlace: WorkPlaceType
    school: SchoolType
    createdAt: Date!
    updatedAt: Date!
  }

  type WorkPlaceType {
  city: String
  state: String
  company_name: String
  principal_name: String
  }

  type SchoolType {
  city: String
  state: String
  school_number: String
  class: String 
  }
input SchoolInput {
  city: String
  state: String
  school_number: String
  class: String
}
input WorkPlaceInput {
  city: String
  state: String
  company_name: String
  principal_name: String
}

input LoginInput {
  email: String!
  password: String!
}

input SignUpInput {
  email: String!
  password: String!
}

  type AuthResponse {
    user: User!
    token: String!
  }
`;