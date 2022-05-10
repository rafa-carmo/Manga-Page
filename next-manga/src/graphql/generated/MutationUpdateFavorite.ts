/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { updateFavoriteInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: MutationUpdateFavorite
// ====================================================

export interface MutationUpdateFavorite_updateFavorite_favorite_mangases {
  __typename: "Mangas";
  id: string;
}

export interface MutationUpdateFavorite_updateFavorite_favorite {
  __typename: "Favorites";
  mangases: MutationUpdateFavorite_updateFavorite_favorite_mangases[];
}

export interface MutationUpdateFavorite_updateFavorite {
  __typename: "updateFavoritePayload";
  favorite: MutationUpdateFavorite_updateFavorite_favorite | null;
}

export interface MutationUpdateFavorite {
  updateFavorite: MutationUpdateFavorite_updateFavorite | null;
}

export interface MutationUpdateFavoriteVariables {
  input: updateFavoriteInput;
}
