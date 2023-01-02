/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryChaptersById
// ====================================================

export interface QueryChaptersById_chaptersInfo_scans {
  __typename: "Scan";
  scan: string;
}

export interface QueryChaptersById_chaptersInfo {
  __typename: "Chapter";
  id: string;
  chapter: string;
  scans: QueryChaptersById_chaptersInfo_scans[];
  created_at: any;
  createdAt: any | null;
}

export interface QueryChaptersById {
  chaptersInfo: QueryChaptersById_chaptersInfo[];
}

export interface QueryChaptersByIdVariables {
  id?: number | null;
  limit?: number | null;
  start?: number | null;
  sort?: string | null;
}
