"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const graphql_tag_1 = __importDefault(require("graphql-tag"));
exports.typeDefs = (0, graphql_tag_1.default) `
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
}

input SignUpInput {
  email: String!
  password: String!
}

  type AuthResponse {
    user: User!
    message: String
  }
`;
