/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryGetChapters
// ====================================================

export interface QueryGetChapters_chapters {
  __typename: "Chapter";
  id: string;
  chapter: string;
}

export interface QueryGetChapters {
  chapters: QueryGetChapters_chapters[];
}

export interface QueryGetChaptersVariables {
  slug?: string | null;
}
