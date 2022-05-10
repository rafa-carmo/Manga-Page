/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { createWishlistInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: MutatioCreateWhislist
// ====================================================

export interface MutatioCreateWhislist_createWishlist_wishlist_mangases_cover {
  __typename: "UploadFile";
  url: string;
}

export interface MutatioCreateWhislist_createWishlist_wishlist_mangases_status {
  __typename: "Status";
  label: string | null;
  value: string | null;
}

export interface MutatioCreateWhislist_createWishlist_wishlist_mangases_genres {
  __typename: "Genres";
  label: string;
  value: string;
}

export interface MutatioCreateWhislist_createWishlist_wishlist_mangases {
  __typename: "Mangas";
  id: string;
  title: string;
  slug: string;
  cover: MutatioCreateWhislist_createWishlist_wishlist_mangases_cover | null;
  status: MutatioCreateWhislist_createWishlist_wishlist_mangases_status | null;
  genres: MutatioCreateWhislist_createWishlist_wishlist_mangases_genres[];
}

export interface MutatioCreateWhislist_createWishlist_wishlist {
  __typename: "Wishlist";
  mangases: MutatioCreateWhislist_createWishlist_wishlist_mangases[];
}

export interface MutatioCreateWhislist_createWishlist {
  __typename: "createWishlistPayload";
  wishlist: MutatioCreateWhislist_createWishlist_wishlist | null;
}

export interface MutatioCreateWhislist {
  createWishlist: MutatioCreateWhislist_createWishlist | null;
}

export interface MutatioCreateWhislistVariables {
  input: createWishlistInput;
}
