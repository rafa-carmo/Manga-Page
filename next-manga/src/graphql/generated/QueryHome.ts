/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryHome
// ====================================================

export interface QueryHome_banners_mangas_banner {
  __typename: "UploadFile";
  url: string;
}

export interface QueryHome_banners_mangas {
  __typename: "Mangas";
  id: string;
  title: string;
  slug: string;
  banner: QueryHome_banners_mangas_banner | null;
  sinopse: string | null;
}

export interface QueryHome_banners {
  __typename: "Banners";
  mangas: QueryHome_banners_mangas | null;
}

export interface QueryHome_lastMangas_cover {
  __typename: "UploadFile";
  url: string;
}

export interface QueryHome_lastMangas_status {
  __typename: "Status";
  label: string | null;
  value: string | null;
}

export interface QueryHome_lastMangas_genres {
  __typename: "Genres";
  label: string;
  value: string;
}

export interface QueryHome_lastMangas {
  __typename: "Mangas";
  id: string;
  title: string;
  slug: string;
  cover: QueryHome_lastMangas_cover | null;
  status: QueryHome_lastMangas_status | null;
  genres: QueryHome_lastMangas_genres[];
}

export interface QueryHome_ranks {
  __typename: "Rank";
  id: string;
  title: string | null;
  cover: string | null;
  genres: string | null;
  url: string | null;
  rank: string | null;
}

export interface QueryHome {
  banners: QueryHome_banners[];
  lastMangas: QueryHome_lastMangas[];
  ranks: QueryHome_ranks[];
}
