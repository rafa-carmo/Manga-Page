/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { updateWishlistInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: MutatioUpdateWhislist
// ====================================================

export interface MutatioUpdateWhislist_updateWishlist_wishlist_mangases_cover {
  __typename: "UploadFile";
  url: string;
}

export interface MutatioUpdateWhislist_updateWishlist_wishlist_mangases_status {
  __typename: "Status";
  label: string | null;
  value: string | null;
}

export interface MutatioUpdateWhislist_updateWishlist_wishlist_mangases_genres {
  __typename: "Genres";
  label: string;
  value: string;
}

export interface MutatioUpdateWhislist_updateWishlist_wishlist_mangases {
  __typename: "Mangas";
  id: string;
  title: string;
  slug: string;
  cover: MutatioUpdateWhislist_updateWishlist_wishlist_mangases_cover | null;
  status: MutatioUpdateWhislist_updateWishlist_wishlist_mangases_status | null;
  genres: MutatioUpdateWhislist_updateWishlist_wishlist_mangases_genres[];
}

export interface MutatioUpdateWhislist_updateWishlist_wishlist {
  __typename: "Wishlist";
  mangases: MutatioUpdateWhislist_updateWishlist_wishlist_mangases[];
}

export interface MutatioUpdateWhislist_updateWishlist {
  __typename: "updateWishlistPayload";
  wishlist: MutatioUpdateWhislist_updateWishlist_wishlist | null;
}

export interface MutatioUpdateWhislist {
  updateWishlist: MutatioUpdateWhislist_updateWishlist | null;
}

export interface MutatioUpdateWhislistVariables {
  input: updateWishlistInput;
}
