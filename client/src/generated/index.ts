// @ts-nocheck
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as ApolloReactHoc from '@apollo/client/react/hoc';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
};

export type AllGroupedRequests = {
  __typename?: 'AllGroupedRequests';
  month: Scalars['Int']['output'];
  requests: Array<Maybe<RequestType>>;
  year: Scalars['Int']['output'];
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  message?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Scalars['String']['output']>;
  user: User;
};

export type CreateRequestTypeInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  fields: Array<RequestFieldDefinitionInput>;
  name: Scalars['String']['input'];
};

export type FieldValueInput = {
  fieldId: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type FieldValueType = {
  __typename?: 'FieldValueType';
  fieldId: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type ForgotPasswordResponse = {
  __typename?: 'ForgotPasswordResponse';
  message: Scalars['String']['output'];
};

export type GroupedRequests = {
  __typename?: 'GroupedRequests';
  requests?: Maybe<Array<Maybe<RequestType>>>;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  requiredRole?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  changeReStatus: StatusChangedResponse;
  checkOTP: OtpResponse;
  createRequestType: RequestTypeTemplate;
  createsOTP: OtpType;
  deleteRequestType: Scalars['Boolean']['output'];
  forgotPassword: ForgotPasswordResponse;
  login: AuthResponse;
  resetPassword: ResetPasswordResponse;
  sentRequest: RequestSentRespone;
  signUp: User;
};


export type MutationChangeReStatusArgs = {
  _id: Scalars['ID']['input'];
  comment?: InputMaybe<Scalars['String']['input']>;
  result: Scalars['String']['input'];
};


export type MutationCheckOtpArgs = {
  OTP: Scalars['String']['input'];
  email: Scalars['String']['input'];
};


export type MutationCreateRequestTypeArgs = {
  input: CreateRequestTypeInput;
};


export type MutationCreatesOtpArgs = {
  email: Scalars['String']['input'];
};


export type MutationDeleteRequestTypeArgs = {
  id: Scalars['ID']['input'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationResetPasswordArgs = {
  OTP: Scalars['String']['input'];
  email: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
};


export type MutationSentRequestArgs = {
  input: SendRequestInput;
};


export type MutationSignUpArgs = {
  input: SignUpInput;
};

export type OtpResponse = {
  __typename?: 'OTPResponse';
  message: Scalars['String']['output'];
  token: Scalars['String']['output'];
};

export type OtpType = {
  __typename?: 'OTPType';
  OTP: Scalars['String']['output'];
  _id: Scalars['ID']['output'];
  email: Scalars['String']['output'];
  expirationDate: Scalars['Date']['output'];
};

export type OpenRequestType = {
  __typename?: 'OpenRequestType';
  _id: Scalars['ID']['output'];
  comment?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Date']['output'];
  detailAboutRequest: Scalars['String']['output'];
  email: Scalars['String']['output'];
  endTime?: Maybe<Scalars['Date']['output']>;
  optionalFile?: Maybe<Scalars['String']['output']>;
  requestType: Scalars['String']['output'];
  result?: Maybe<Scalars['String']['output']>;
  startTime?: Maybe<Scalars['Date']['output']>;
  supervisorEmail: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type Query = {
  __typename?: 'Query';
  getAllRequests: Array<RequestType>;
  getRequestById: RequestType;
  getRequestByUserID: Array<RequestType>;
  getRequestTypeTemplate?: Maybe<RequestTypeTemplate>;
  getRequestTypeTemplates: Array<RequestTypeTemplate>;
  getRequests: Array<AllGroupedRequests>;
  getUser: User;
  openRequest?: Maybe<OpenRequestType>;
};


export type QueryGetRequestByIdArgs = {
  _id: Scalars['ID']['input'];
};


export type QueryGetRequestTypeTemplateArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetRequestsArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  result?: InputMaybe<Scalars['String']['input']>;
};


export type QueryOpenRequestArgs = {
  _id?: InputMaybe<Scalars['ID']['input']>;
};

export type RequestFieldDefinition = {
  __typename?: 'RequestFieldDefinition';
  id: Scalars['String']['output'];
  label: Scalars['String']['output'];
  required: Scalars['Boolean']['output'];
  type: Scalars['String']['output'];
};

export type RequestFieldDefinitionInput = {
  id: Scalars['String']['input'];
  label: Scalars['String']['input'];
  required: Scalars['Boolean']['input'];
  type: Scalars['String']['input'];
};

export type RequestSentRespone = {
  __typename?: 'RequestSentRespone';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type RequestType = {
  __typename?: 'RequestType';
  _id: Scalars['ID']['output'];
  attachments?: Maybe<Array<Scalars['String']['output']>>;
  comment?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Date']['output'];
  email: Scalars['String']['output'];
  endTime: Scalars['String']['output'];
  fieldValues: Array<FieldValueType>;
  firstname: Scalars['String']['output'];
  lastname: Scalars['String']['output'];
  requestTypeDetail?: Maybe<RequestTypeTemplate>;
  requestTypeId: Scalars['String']['output'];
  result: Scalars['String']['output'];
  startTime: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
  userId: Scalars['String']['output'];
};

export type RequestTypePop = {
  __typename?: 'RequestTypePop';
  _id: Scalars['ID']['output'];
  comment?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Date']['output'];
  detailAboutRequest: Scalars['String']['output'];
  email: User;
  endTime: Scalars['Date']['output'];
  message?: Maybe<Scalars['String']['output']>;
  optionalFile?: Maybe<Scalars['String']['output']>;
  requestType: Scalars['String']['output'];
  result?: Maybe<Scalars['String']['output']>;
  startTime: Scalars['Date']['output'];
  supervisorEmail?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Date']['output'];
};

export type RequestTypeTemplate = {
  __typename?: 'RequestTypeTemplate';
  _id: Scalars['ID']['output'];
  createdAt: Scalars['Date']['output'];
  description?: Maybe<Scalars['String']['output']>;
  fields: Array<RequestFieldDefinition>;
  name: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type ResetPasswordResponse = {
  __typename?: 'ResetPasswordResponse';
  message: Scalars['String']['output'];
};

export type SchoolInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  class?: InputMaybe<Scalars['String']['input']>;
  school_number?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
};

export type SchoolType = {
  __typename?: 'SchoolType';
  city?: Maybe<Scalars['String']['output']>;
  class?: Maybe<Scalars['String']['output']>;
  school_number?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
};

export type SendRequestInput = {
  attachments?: InputMaybe<Array<Scalars['String']['input']>>;
  email: Scalars['String']['input'];
  endTime: Scalars['String']['input'];
  fieldValues: Array<FieldValueInput>;
  firstname: Scalars['String']['input'];
  lastname: Scalars['String']['input'];
  requestTypeId: Scalars['String']['input'];
  startTime: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type SignUpInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type StatusChangedResponse = {
  __typename?: 'StatusChangedResponse';
  message?: Maybe<Scalars['String']['output']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  age?: Maybe<Scalars['Int']['output']>;
  birthDate?: Maybe<Scalars['Date']['output']>;
  createdAt: Scalars['Date']['output'];
  email: Scalars['String']['output'];
  firstname?: Maybe<Scalars['String']['output']>;
  home_address?: Maybe<Scalars['String']['output']>;
  isEmailVerified?: Maybe<Scalars['Boolean']['output']>;
  lastname?: Maybe<Scalars['String']['output']>;
  otp?: Maybe<Scalars['String']['output']>;
  password: Scalars['String']['output'];
  passwordResetToken?: Maybe<Scalars['String']['output']>;
  passwordResetTokenExpire?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  position?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  school?: Maybe<SchoolType>;
  updatedAt: Scalars['Date']['output'];
  workPlace?: Maybe<WorkPlaceType>;
};

export type WorkPlaceInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  company_name?: InputMaybe<Scalars['String']['input']>;
  principal_name?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
};

export type WorkPlaceType = {
  __typename?: 'WorkPlaceType';
  city?: Maybe<Scalars['String']['output']>;
  company_name?: Maybe<Scalars['String']['output']>;
  principal_name?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
};

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', getUser: { __typename?: 'User', _id: string, email: string, password: string, firstname?: string | null, lastname?: string | null, role?: string | null, position?: string | null, phoneNumber?: string | null, otp?: string | null, passwordResetToken?: string | null, passwordResetTokenExpire?: string | null, age?: number | null, birthDate?: any | null, home_address?: string | null, createdAt: any, updatedAt: any, workPlace?: { __typename?: 'WorkPlaceType', city?: string | null, state?: string | null, company_name?: string | null, principal_name?: string | null } | null, school?: { __typename?: 'SchoolType', city?: string | null, state?: string | null, school_number?: string | null, class?: string | null } | null } };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponse', message?: string | null, token?: string | null, user: { __typename?: 'User', email: string } } };

export type SignUpMutationVariables = Exact<{
  input: SignUpInput;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'User', email: string } };

export type CheckOtpMutationVariables = Exact<{
  email: Scalars['String']['input'];
  otp: Scalars['String']['input'];
}>;


export type CheckOtpMutation = { __typename?: 'Mutation', checkOTP: { __typename?: 'OTPResponse', message: string, token: string } };

export type GetAllRequestsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllRequestsQuery = { __typename?: 'Query', getAllRequests: Array<{ __typename?: 'RequestType', _id: string, email: string, firstname: string, lastname: string, userId: string, requestTypeId: string, startTime: string, endTime: string, result: string, comment?: string | null, createdAt: any, updatedAt: any, requestTypeDetail?: { __typename?: 'RequestTypeTemplate', _id: string, name: string, description?: string | null, fields: Array<{ __typename?: 'RequestFieldDefinition', id: string, label: string, type: string, required: boolean }> } | null, fieldValues: Array<{ __typename?: 'FieldValueType', fieldId: string, value: string }> }> };

export type GetRequestByUserIdQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRequestByUserIdQuery = { __typename?: 'Query', getRequestByUserID: Array<{ __typename?: 'RequestType', _id: string, email: string, firstname: string, lastname: string, userId: string, requestTypeId: string, startTime: string, endTime: string, attachments?: Array<string> | null, result: string, comment?: string | null, createdAt: any, updatedAt: any, requestTypeDetail?: { __typename?: 'RequestTypeTemplate', _id: string, name: string, description?: string | null, fields: Array<{ __typename?: 'RequestFieldDefinition', id: string, label: string, type: string, required: boolean }> } | null, fieldValues: Array<{ __typename?: 'FieldValueType', fieldId: string, value: string }> }> };

export type GetRequestTypeTemplatesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRequestTypeTemplatesQuery = { __typename?: 'Query', getRequestTypeTemplates: Array<{ __typename?: 'RequestTypeTemplate', _id: string, name: string, description?: string | null, fields: Array<{ __typename?: 'RequestFieldDefinition', id: string, label: string, type: string, required: boolean }> }> };

export type SentRequestMutationVariables = Exact<{
  input: SendRequestInput;
}>;


export type SentRequestMutation = { __typename?: 'Mutation', sentRequest: { __typename?: 'RequestSentRespone', message: string, success: boolean } };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: { __typename?: 'ForgotPasswordResponse', message: string } };

export type ResetPasswordMutationVariables = Exact<{
  email: Scalars['String']['input'];
  otp: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: { __typename?: 'ResetPasswordResponse', message: string } };


export const GetUserDocument = gql`
    query GetUser {
  getUser {
    _id
    email
    password
    firstname
    lastname
    role
    position
    phoneNumber
    otp
    passwordResetToken
    passwordResetTokenExpire
    age
    birthDate
    home_address
    workPlace {
      city
      state
      company_name
      principal_name
    }
    school {
      city
      state
      school_number
      class
    }
    createdAt
    updatedAt
  }
}
    `;
export type GetUserProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetUserQuery, GetUserQueryVariables>
    } & TChildProps;
export function withGetUser<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetUserQuery,
  GetUserQueryVariables,
  GetUserProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetUserQuery, GetUserQueryVariables, GetUserProps<TChildProps, TDataName>>(GetUserDocument, {
      alias: 'getUser',
      ...operationOptions
    });
};

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserQuery(baseOptions?: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export function useGetUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserSuspenseQueryHookResult = ReturnType<typeof useGetUserSuspenseQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    user {
      email
    }
    message
    token
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;
export type LoginProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<LoginMutation, LoginMutationVariables>
    } & TChildProps;
export function withLogin<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  LoginMutation,
  LoginMutationVariables,
  LoginProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, LoginMutation, LoginMutationVariables, LoginProps<TChildProps, TDataName>>(LoginDocument, {
      alias: 'login',
      ...operationOptions
    });
};

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const SignUpDocument = gql`
    mutation SignUp($input: SignUpInput!) {
  signUp(input: $input) {
    email
  }
}
    `;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;
export type SignUpProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>
    } & TChildProps;
export function withSignUp<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  SignUpMutation,
  SignUpMutationVariables,
  SignUpProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, SignUpMutation, SignUpMutationVariables, SignUpProps<TChildProps, TDataName>>(SignUpDocument, {
      alias: 'signUp',
      ...operationOptions
    });
};

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const CheckOtpDocument = gql`
    mutation CheckOTP($email: String!, $otp: String!) {
  checkOTP(email: $email, OTP: $otp) {
    message
    token
  }
}
    `;
export type CheckOtpMutationFn = Apollo.MutationFunction<CheckOtpMutation, CheckOtpMutationVariables>;
export type CheckOtpProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<CheckOtpMutation, CheckOtpMutationVariables>
    } & TChildProps;
export function withCheckOtp<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CheckOtpMutation,
  CheckOtpMutationVariables,
  CheckOtpProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, CheckOtpMutation, CheckOtpMutationVariables, CheckOtpProps<TChildProps, TDataName>>(CheckOtpDocument, {
      alias: 'checkOtp',
      ...operationOptions
    });
};

/**
 * __useCheckOtpMutation__
 *
 * To run a mutation, you first call `useCheckOtpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCheckOtpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [checkOtpMutation, { data, loading, error }] = useCheckOtpMutation({
 *   variables: {
 *      email: // value for 'email'
 *      otp: // value for 'otp'
 *   },
 * });
 */
export function useCheckOtpMutation(baseOptions?: Apollo.MutationHookOptions<CheckOtpMutation, CheckOtpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CheckOtpMutation, CheckOtpMutationVariables>(CheckOtpDocument, options);
      }
export type CheckOtpMutationHookResult = ReturnType<typeof useCheckOtpMutation>;
export type CheckOtpMutationResult = Apollo.MutationResult<CheckOtpMutation>;
export type CheckOtpMutationOptions = Apollo.BaseMutationOptions<CheckOtpMutation, CheckOtpMutationVariables>;
export const GetAllRequestsDocument = gql`
    query GetAllRequests {
  getAllRequests {
    _id
    email
    firstname
    lastname
    userId
    requestTypeId
    requestTypeDetail {
      _id
      name
      description
      fields {
        id
        label
        type
        required
      }
    }
    startTime
    endTime
    fieldValues {
      fieldId
      value
    }
    result
    comment
    createdAt
    updatedAt
  }
}
    `;
export type GetAllRequestsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetAllRequestsQuery, GetAllRequestsQueryVariables>
    } & TChildProps;
export function withGetAllRequests<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetAllRequestsQuery,
  GetAllRequestsQueryVariables,
  GetAllRequestsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetAllRequestsQuery, GetAllRequestsQueryVariables, GetAllRequestsProps<TChildProps, TDataName>>(GetAllRequestsDocument, {
      alias: 'getAllRequests',
      ...operationOptions
    });
};

/**
 * __useGetAllRequestsQuery__
 *
 * To run a query within a React component, call `useGetAllRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllRequestsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllRequestsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllRequestsQuery, GetAllRequestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllRequestsQuery, GetAllRequestsQueryVariables>(GetAllRequestsDocument, options);
      }
export function useGetAllRequestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllRequestsQuery, GetAllRequestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllRequestsQuery, GetAllRequestsQueryVariables>(GetAllRequestsDocument, options);
        }
export function useGetAllRequestsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllRequestsQuery, GetAllRequestsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllRequestsQuery, GetAllRequestsQueryVariables>(GetAllRequestsDocument, options);
        }
export type GetAllRequestsQueryHookResult = ReturnType<typeof useGetAllRequestsQuery>;
export type GetAllRequestsLazyQueryHookResult = ReturnType<typeof useGetAllRequestsLazyQuery>;
export type GetAllRequestsSuspenseQueryHookResult = ReturnType<typeof useGetAllRequestsSuspenseQuery>;
export type GetAllRequestsQueryResult = Apollo.QueryResult<GetAllRequestsQuery, GetAllRequestsQueryVariables>;
export const GetRequestByUserIdDocument = gql`
    query GetRequestByUserID {
  getRequestByUserID {
    _id
    email
    firstname
    lastname
    userId
    requestTypeId
    requestTypeDetail {
      _id
      name
      description
      fields {
        id
        label
        type
        required
      }
    }
    startTime
    endTime
    fieldValues {
      fieldId
      value
    }
    attachments
    result
    comment
    createdAt
    updatedAt
  }
}
    `;
export type GetRequestByUserIdProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetRequestByUserIdQuery, GetRequestByUserIdQueryVariables>
    } & TChildProps;
export function withGetRequestByUserId<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetRequestByUserIdQuery,
  GetRequestByUserIdQueryVariables,
  GetRequestByUserIdProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetRequestByUserIdQuery, GetRequestByUserIdQueryVariables, GetRequestByUserIdProps<TChildProps, TDataName>>(GetRequestByUserIdDocument, {
      alias: 'getRequestByUserId',
      ...operationOptions
    });
};

/**
 * __useGetRequestByUserIdQuery__
 *
 * To run a query within a React component, call `useGetRequestByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRequestByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRequestByUserIdQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRequestByUserIdQuery(baseOptions?: Apollo.QueryHookOptions<GetRequestByUserIdQuery, GetRequestByUserIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRequestByUserIdQuery, GetRequestByUserIdQueryVariables>(GetRequestByUserIdDocument, options);
      }
export function useGetRequestByUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRequestByUserIdQuery, GetRequestByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRequestByUserIdQuery, GetRequestByUserIdQueryVariables>(GetRequestByUserIdDocument, options);
        }
export function useGetRequestByUserIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetRequestByUserIdQuery, GetRequestByUserIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetRequestByUserIdQuery, GetRequestByUserIdQueryVariables>(GetRequestByUserIdDocument, options);
        }
export type GetRequestByUserIdQueryHookResult = ReturnType<typeof useGetRequestByUserIdQuery>;
export type GetRequestByUserIdLazyQueryHookResult = ReturnType<typeof useGetRequestByUserIdLazyQuery>;
export type GetRequestByUserIdSuspenseQueryHookResult = ReturnType<typeof useGetRequestByUserIdSuspenseQuery>;
export type GetRequestByUserIdQueryResult = Apollo.QueryResult<GetRequestByUserIdQuery, GetRequestByUserIdQueryVariables>;
export const GetRequestTypeTemplatesDocument = gql`
    query GetRequestTypeTemplates {
  getRequestTypeTemplates {
    _id
    name
    description
    fields {
      id
      label
      type
      required
    }
  }
}
    `;
export type GetRequestTypeTemplatesProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetRequestTypeTemplatesQuery, GetRequestTypeTemplatesQueryVariables>
    } & TChildProps;
export function withGetRequestTypeTemplates<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetRequestTypeTemplatesQuery,
  GetRequestTypeTemplatesQueryVariables,
  GetRequestTypeTemplatesProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetRequestTypeTemplatesQuery, GetRequestTypeTemplatesQueryVariables, GetRequestTypeTemplatesProps<TChildProps, TDataName>>(GetRequestTypeTemplatesDocument, {
      alias: 'getRequestTypeTemplates',
      ...operationOptions
    });
};

/**
 * __useGetRequestTypeTemplatesQuery__
 *
 * To run a query within a React component, call `useGetRequestTypeTemplatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRequestTypeTemplatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRequestTypeTemplatesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRequestTypeTemplatesQuery(baseOptions?: Apollo.QueryHookOptions<GetRequestTypeTemplatesQuery, GetRequestTypeTemplatesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRequestTypeTemplatesQuery, GetRequestTypeTemplatesQueryVariables>(GetRequestTypeTemplatesDocument, options);
      }
export function useGetRequestTypeTemplatesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRequestTypeTemplatesQuery, GetRequestTypeTemplatesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRequestTypeTemplatesQuery, GetRequestTypeTemplatesQueryVariables>(GetRequestTypeTemplatesDocument, options);
        }
export function useGetRequestTypeTemplatesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetRequestTypeTemplatesQuery, GetRequestTypeTemplatesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetRequestTypeTemplatesQuery, GetRequestTypeTemplatesQueryVariables>(GetRequestTypeTemplatesDocument, options);
        }
export type GetRequestTypeTemplatesQueryHookResult = ReturnType<typeof useGetRequestTypeTemplatesQuery>;
export type GetRequestTypeTemplatesLazyQueryHookResult = ReturnType<typeof useGetRequestTypeTemplatesLazyQuery>;
export type GetRequestTypeTemplatesSuspenseQueryHookResult = ReturnType<typeof useGetRequestTypeTemplatesSuspenseQuery>;
export type GetRequestTypeTemplatesQueryResult = Apollo.QueryResult<GetRequestTypeTemplatesQuery, GetRequestTypeTemplatesQueryVariables>;
export const SentRequestDocument = gql`
    mutation SentRequest($input: SendRequestInput!) {
  sentRequest(input: $input) {
    message
    success
  }
}
    `;
export type SentRequestMutationFn = Apollo.MutationFunction<SentRequestMutation, SentRequestMutationVariables>;
export type SentRequestProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<SentRequestMutation, SentRequestMutationVariables>
    } & TChildProps;
export function withSentRequest<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  SentRequestMutation,
  SentRequestMutationVariables,
  SentRequestProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, SentRequestMutation, SentRequestMutationVariables, SentRequestProps<TChildProps, TDataName>>(SentRequestDocument, {
      alias: 'sentRequest',
      ...operationOptions
    });
};

/**
 * __useSentRequestMutation__
 *
 * To run a mutation, you first call `useSentRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSentRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sentRequestMutation, { data, loading, error }] = useSentRequestMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSentRequestMutation(baseOptions?: Apollo.MutationHookOptions<SentRequestMutation, SentRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SentRequestMutation, SentRequestMutationVariables>(SentRequestDocument, options);
      }
export type SentRequestMutationHookResult = ReturnType<typeof useSentRequestMutation>;
export type SentRequestMutationResult = Apollo.MutationResult<SentRequestMutation>;
export type SentRequestMutationOptions = Apollo.BaseMutationOptions<SentRequestMutation, SentRequestMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email) {
    message
  }
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export type ForgotPasswordProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>
    } & TChildProps;
export function withForgotPassword<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables,
  ForgotPasswordProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, ForgotPasswordMutation, ForgotPasswordMutationVariables, ForgotPasswordProps<TChildProps, TDataName>>(ForgotPasswordDocument, {
      alias: 'forgotPassword',
      ...operationOptions
    });
};

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($email: String!, $otp: String!, $newPassword: String!) {
  resetPassword(email: $email, OTP: $otp, newPassword: $newPassword) {
    message
  }
}
    `;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;
export type ResetPasswordProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>
    } & TChildProps;
export function withResetPassword<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  ResetPasswordMutation,
  ResetPasswordMutationVariables,
  ResetPasswordProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, ResetPasswordMutation, ResetPasswordMutationVariables, ResetPasswordProps<TChildProps, TDataName>>(ResetPasswordDocument, {
      alias: 'resetPassword',
      ...operationOptions
    });
};

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *      otp: // value for 'otp'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;