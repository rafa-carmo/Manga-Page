/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryMangas
// ====================================================

export interface QueryMangas_mangas_cover {
  __typename: "UploadFile";
  url: string;
}

export interface QueryMangas_mangas_status {
  __typename: "Status";
  label: string | null;
  value: string | null;
}

export interface QueryMangas_mangas_genres {
  __typename: "Genres";
  label: string;
  value: string;
}

export interface QueryMangas_mangas {
  __typename: "Mangas";
  id: string;
  title: string;
  slug: string;
  cover: QueryMangas_mangas_cover | null;
  status: QueryMangas_mangas_status | null;
  genres: QueryMangas_mangas_genres[];
}

export interface QueryMangas {
  mangas: QueryMangas_mangas[];
}

export interface QueryMangasVariables {
  limit?: number | null;
}
