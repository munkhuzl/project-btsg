import {mergeTypeDefs} from '@graphql-tools/merge';
import {typeDefs as AuthTypeDefs} from './auth.schema';
import { OTPTypeDefs } from './otp.schema';
export const typeDefs=mergeTypeDefs([AuthTypeDefs, OTPTypeDefs]);