/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MangaCardFragment
// ====================================================

export interface MangaCardFragment_cover {
  __typename: "UploadFile";
  url: string;
}

export interface MangaCardFragment_status {
  __typename: "Status";
  label: string | null;
  value: string | null;
}

export interface MangaCardFragment_genres {
  __typename: "Genres";
  label: string;
  value: string;
}

export interface MangaCardFragment {
  __typename: "Mangas";
  id: string;
  title: string;
  slug: string;
  cover: MangaCardFragment_cover | null;
  status: MangaCardFragment_status | null;
  genres: MangaCardFragment_genres[];
}
