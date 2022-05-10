/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryFilterItems
// ====================================================

export interface QueryFilterItems_genres {
  __typename: "Genres";
  label: string;
  value: string;
}

export interface QueryFilterItems_origins {
  __typename: "Origins";
  label: string | null;
  value: string | null;
}

export interface QueryFilterItems_statuses {
  __typename: "Status";
  label: string | null;
  value: string | null;
}

export interface QueryFilterItems {
  genres: QueryFilterItems_genres[];
  origins: QueryFilterItems_origins[];
  statuses: QueryFilterItems_statuses[];
}
