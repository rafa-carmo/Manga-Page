/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryReleasedChapters
// ====================================================

export interface QueryReleasedChapters_chapters_mangas_cover {
  __typename: "UploadFile";
  url: string;
}

export interface QueryReleasedChapters_chapters_mangas {
  __typename: "Mangas";
  id: string;
  title: string;
  slug: string;
  cover: QueryReleasedChapters_chapters_mangas_cover | null;
}

export interface QueryReleasedChapters_chapters_scans {
  __typename: "Scan";
  id: string;
  scan: string;
  slug: string | null;
}

export interface QueryReleasedChapters_chapters {
  __typename: "Chapter";
  id: string;
  mangas: QueryReleasedChapters_chapters_mangas | null;
  chapter: string;
  scans: QueryReleasedChapters_chapters_scans[];
  created_at: any;
  createdAt: any | null;
}

export interface QueryReleasedChapters {
  chapters: QueryReleasedChapters_chapters[];
}

export interface QueryReleasedChaptersVariables {
  limit?: number | null;
  start?: number | null;
}
