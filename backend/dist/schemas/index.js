"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const merge_1 = require("@graphql-tools/merge");
const auth_schema_1 = require("./auth.schema");
const otp_schema_1 = require("./otp.schema");
const request_schema_1 = require("./request.schema");
const mutation_schema_1 = require("@/schemas/mutation.schema");
exports.typeDefs = (0, merge_1.mergeTypeDefs)([auth_schema_1.typeDefs, otp_schema_1.OTPTypeDefs, request_schema_1.RequestTypeDefs, mutation_schema_1.MutationTypeDefs]);
