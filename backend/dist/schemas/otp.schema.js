"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OTPTypeDefs = void 0;
const graphql_tag_1 = __importDefault(require("graphql-tag"));
exports.OTPTypeDefs = (0, graphql_tag_1.default) `
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
