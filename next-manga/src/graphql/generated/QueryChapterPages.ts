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

export interface QueryChapterPages_chapters_scan {
  __typename: "Scan";
  id: string;
  scan: string;
  slug: string | null;
}

export interface QueryChapterPages_chapters {
  __typename: "Chapter";
  id: string;
  chapter: string;
  scan: QueryChapterPages_chapters_scan | null;
}

export interface QueryChapterPages {
  chapter: QueryChapterPages_chapter[];
  chapters: QueryChapterPages_chapters[];
}

export interface QueryChapterPagesVariables {
  chapter?: string | null;
  slug?: string | null;
}
