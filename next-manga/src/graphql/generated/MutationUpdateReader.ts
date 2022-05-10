/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { updateReaderInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: MutationUpdateReader
// ====================================================

export interface MutationUpdateReader_updateReader_reader {
  __typename: "Reader";
  readers: any | null;
}

export interface MutationUpdateReader_updateReader {
  __typename: "updateReaderPayload";
  reader: MutationUpdateReader_updateReader_reader | null;
}

export interface MutationUpdateReader {
  updateReader: MutationUpdateReader_updateReader | null;
}

export interface MutationUpdateReaderVariables {
  input: updateReaderInput;
}
