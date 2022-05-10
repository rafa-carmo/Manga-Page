/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryUserFavorites
// ====================================================

export interface QueryUserFavorites_favoriteForUser_cover {
  __typename: "UploadFile";
  url: string;
}

export interface QueryUserFavorites_favoriteForUser_status {
  __typename: "Status";
  label: string | null;
  value: string | null;
}

export interface QueryUserFavorites_favoriteForUser_genres {
  __typename: "Genres";
  label: string;
  value: string;
}

export interface QueryUserFavorites_favoriteForUser {
  __typename: "Mangas";
  id: string;
  title: string;
  slug: string;
  cover: QueryUserFavorites_favoriteForUser_cover | null;
  status: QueryUserFavorites_favoriteForUser_status | null;
  genres: QueryUserFavorites_favoriteForUser_genres[];
}

export interface QueryUserFavorites {
  favoriteForUser: QueryUserFavorites_favoriteForUser[];
}
