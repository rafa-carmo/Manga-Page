/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { createFavoriteInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: MutatioCreateFavorite
// ====================================================

export interface MutatioCreateFavorite_createFavorite_favorite_mangases {
  __typename: "Mangas";
  id: string;
}

export interface MutatioCreateFavorite_createFavorite_favorite {
  __typename: "Favorites";
  mangases: MutatioCreateFavorite_createFavorite_favorite_mangases[];
}

export interface MutatioCreateFavorite_createFavorite {
  __typename: "createFavoritePayload";
  favorite: MutatioCreateFavorite_createFavorite_favorite | null;
}

export interface MutatioCreateFavorite {
  createFavorite: MutatioCreateFavorite_createFavorite | null;
}

export interface MutatioCreateFavoriteVariables {
  input: createFavoriteInput;
}
