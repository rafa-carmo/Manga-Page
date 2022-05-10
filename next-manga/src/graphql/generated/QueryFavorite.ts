/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryFavorite
// ====================================================

export interface QueryFavorite_favorites_mangases_cover {
  __typename: "UploadFile";
  url: string;
}

export interface QueryFavorite_favorites_mangases_status {
  __typename: "Status";
  label: string | null;
  value: string | null;
}

export interface QueryFavorite_favorites_mangases_genres {
  __typename: "Genres";
  label: string;
  value: string;
}

export interface QueryFavorite_favorites_mangases {
  __typename: "Mangas";
  id: string;
  title: string;
  slug: string;
  cover: QueryFavorite_favorites_mangases_cover | null;
  status: QueryFavorite_favorites_mangases_status | null;
  genres: QueryFavorite_favorites_mangases_genres[];
}

export interface QueryFavorite_favorites {
  __typename: "Favorites";
  id: string;
  mangases: QueryFavorite_favorites_mangases[];
}

export interface QueryFavorite {
  favorites: QueryFavorite_favorites[];
}

export interface QueryFavoriteVariables {
  identifier: string;
}
