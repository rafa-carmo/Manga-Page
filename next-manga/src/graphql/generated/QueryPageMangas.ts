/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryPageMangas
// ====================================================

export interface QueryPageMangas_genres {
  __typename: "Genres";
  label: string;
  value: string;
}

export interface QueryPageMangas_origins {
  __typename: "Origins";
  label: string | null;
  value: string | null;
}

export interface QueryPageMangas_statuses {
  __typename: "Status";
  label: string | null;
  value: string | null;
}

export interface QueryPageMangas_lastMangas_cover {
  __typename: "UploadFile";
  url: string;
}

export interface QueryPageMangas_lastMangas {
  __typename: "Mangas";
  id: string;
  title: string;
  slug: string;
  cover: QueryPageMangas_lastMangas_cover | null;
}

export interface QueryPageMangas_mangas_cover {
  __typename: "UploadFile";
  url: string;
}

export interface QueryPageMangas_mangas_status {
  __typename: "Status";
  label: string | null;
  value: string | null;
}

export interface QueryPageMangas_mangas_genres {
  __typename: "Genres";
  label: string;
  value: string;
}

export interface QueryPageMangas_mangas {
  __typename: "Mangas";
  id: string;
  title: string;
  slug: string;
  cover: QueryPageMangas_mangas_cover | null;
  status: QueryPageMangas_mangas_status | null;
  genres: QueryPageMangas_mangas_genres[];
}

export interface QueryPageMangas {
  genres: QueryPageMangas_genres[];
  origins: QueryPageMangas_origins[];
  statuses: QueryPageMangas_statuses[];
  lastMangas: QueryPageMangas_lastMangas[];
  mangas: QueryPageMangas_mangas[];
}

export interface QueryPageMangasVariables {
  limit?: number | null;
  sort?: string | null;
  start?: number | null;
  where?: any | null;
}
