/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MangaCardSliderFragment
// ====================================================

export interface MangaCardSliderFragment_cover {
  __typename: "UploadFile";
  url: string;
}

export interface MangaCardSliderFragment {
  __typename: "Mangas";
  id: string;
  title: string;
  slug: string;
  cover: MangaCardSliderFragment_cover | null;
}
