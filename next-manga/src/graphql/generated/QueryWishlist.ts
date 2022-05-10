/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryWishlist
// ====================================================

export interface QueryWishlist_wishlists_user {
  __typename: "UsersPermissionsUser";
  username: string;
}

export interface QueryWishlist_wishlists_mangases_cover {
  __typename: "UploadFile";
  url: string;
}

export interface QueryWishlist_wishlists_mangases_status {
  __typename: "Status";
  label: string | null;
  value: string | null;
}

export interface QueryWishlist_wishlists_mangases_genres {
  __typename: "Genres";
  label: string;
  value: string;
}

export interface QueryWishlist_wishlists_mangases {
  __typename: "Mangas";
  id: string;
  title: string;
  slug: string;
  cover: QueryWishlist_wishlists_mangases_cover | null;
  status: QueryWishlist_wishlists_mangases_status | null;
  genres: QueryWishlist_wishlists_mangases_genres[];
}

export interface QueryWishlist_wishlists {
  __typename: "Wishlist";
  id: string;
  user: QueryWishlist_wishlists_user[];
  mangases: QueryWishlist_wishlists_mangases[];
}

export interface QueryWishlist {
  wishlists: QueryWishlist_wishlists[];
}

export interface QueryWishlistVariables {
  identifier: string;
}
