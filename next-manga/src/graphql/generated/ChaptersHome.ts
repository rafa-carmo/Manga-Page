/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ChaptersHome
// ====================================================

export interface ChaptersHome_mangas_cover {
  __typename: "UploadFile";
  url: string;
}

export interface ChaptersHome_mangas {
  __typename: "Mangas";
  id: string;
  title: string;
  slug: string;
  cover: ChaptersHome_mangas_cover | null;
}

export interface ChaptersHome_scan {
  __typename: "Scan";
  id: string;
  scan: string;
  slug: string | null;
}

export interface ChaptersHome {
  __typename: "Chapter";
  id: string;
  mangas: ChaptersHome_mangas | null;
  chapter: string;
  scan: ChaptersHome_scan | null;
  created_at: any;
  createdAt: any | null;
}
