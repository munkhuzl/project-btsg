import {mergeTypeDefs} from '@graphql-tools/merge';
import {typeDefs as AuthTypeDefs} from './auth.schema';
import { OTPTypeDefs } from './otp.schema';
import { RequestTypeDefs } from './request.schema';
export const typeDefs=mergeTypeDefs([AuthTypeDefs, OTPTypeDefs, RequestTypeDefs]);