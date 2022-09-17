/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryChapterPages
// ====================================================

export interface QueryChapterPages_chapter_mangas {
  __typename: "Mangas";
  id: string;
  title: string;
}

export interface QueryChapterPages_chapter_pages {
  __typename: "ComponentChapterPages";
  page: string;
}

export interface QueryChapterPages_chapter {
  __typename: "Chapter";
  id: string;
  mangas: QueryChapterPages_chapter_mangas | null;
  pages: (QueryChapterPages_chapter_pages | null)[] | null;
}

export interface QueryChapterPages {
  chapter: QueryChapterPages_chapter[];
}

export interface QueryChapterPagesVariables {
  chapter?: string | null;
  slug?: string | null;
}
