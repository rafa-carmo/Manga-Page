/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { createReaderInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: MutationCreateReader
// ====================================================

export interface MutationCreateReader_createReader_reader {
  __typename: "Reader";
  readers: any | null;
}

export interface MutationCreateReader_createReader {
  __typename: "createReaderPayload";
  reader: MutationCreateReader_createReader_reader | null;
}

export interface MutationCreateReader {
  createReader: MutationCreateReader_createReader | null;
}

export interface MutationCreateReaderVariables {
  input: createReaderInput;
}
