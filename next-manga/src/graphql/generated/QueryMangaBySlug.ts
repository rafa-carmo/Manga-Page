/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryMangaBySlug
// ====================================================

export interface QueryMangaBySlug_manga_cover {
  __typename: "UploadFile";
  url: string;
}

export interface QueryMangaBySlug_manga_banner {
  __typename: "UploadFile";
  url: string;
}

export interface QueryMangaBySlug_manga_artists {
  __typename: "Artist";
  name: string;
}

export interface QueryMangaBySlug_manga_stories {
  __typename: "Story";
  name: string;
}

export interface QueryMangaBySlug_manga_status {
  __typename: "Status";
  label: string | null;
  value: string | null;
}

export interface QueryMangaBySlug_manga_genres {
  __typename: "Genres";
  label: string;
}

export interface QueryMangaBySlug_manga_origin {
  __typename: "Origins";
  label: string | null;
  value: string | null;
}

export interface QueryMangaBySlug_manga {
  __typename: "Mangas";
  id: string;
  title: string;
  cover: QueryMangaBySlug_manga_cover | null;
  banner: QueryMangaBySlug_manga_banner | null;
  artists: QueryMangaBySlug_manga_artists[];
  stories: QueryMangaBySlug_manga_stories[];
  englishName: string | null;
  originalName: string | null;
  romajiName: string | null;
  type: string | null;
  status: QueryMangaBySlug_manga_status | null;
  sinopse: string | null;
  genres: QueryMangaBySlug_manga_genres[];
  origin: QueryMangaBySlug_manga_origin | null;
}

export interface QueryMangaBySlug {
  manga: QueryMangaBySlug_manga[];
}

export interface QueryMangaBySlugVariables {
  slug?: string | null;
}
