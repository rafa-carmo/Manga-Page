/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryUserWishlist
// ====================================================

export interface QueryUserWishlist_wishlistForUser_cover {
  __typename: "UploadFile";
  url: string;
}

export interface QueryUserWishlist_wishlistForUser_status {
  __typename: "Status";
  label: string | null;
  value: string | null;
}

export interface QueryUserWishlist_wishlistForUser_genres {
  __typename: "Genres";
  label: string;
  value: string;
}

export interface QueryUserWishlist_wishlistForUser {
  __typename: "Mangas";
  id: string;
  title: string;
  slug: string;
  cover: QueryUserWishlist_wishlistForUser_cover | null;
  status: QueryUserWishlist_wishlistForUser_status | null;
  genres: QueryUserWishlist_wishlistForUser_genres[];
}

export interface QueryUserWishlist {
  wishlistForUser: (QueryUserWishlist_wishlistForUser | null)[];
}
