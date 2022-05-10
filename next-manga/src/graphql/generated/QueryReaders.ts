/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryReaders
// ====================================================

export interface QueryReaders_readers_user {
  __typename: "UsersPermissionsUser";
  username: string;
}

export interface QueryReaders_readers {
  __typename: "Reader";
  id: string;
  user: QueryReaders_readers_user | null;
  readers: any | null;
}

export interface QueryReaders {
  readers: QueryReaders_readers[];
}

export interface QueryReadersVariables {
  identifier: string;
}
