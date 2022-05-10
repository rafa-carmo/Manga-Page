/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryChaptersPaths
// ====================================================

export interface QueryChaptersPaths_chapters_mangas {
  __typename: "Mangas";
  slug: string;
}

export interface QueryChaptersPaths_chapters {
  __typename: "Chapter";
  id: string;
  mangas: QueryChaptersPaths_chapters_mangas | null;
  chapter: string;
}

export interface QueryChaptersPaths {
  chapters: QueryChaptersPaths_chapters[];
}

export interface QueryChaptersPathsVariables {
  limit?: number | null;
}
