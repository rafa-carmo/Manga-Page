/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum ENUM_COMPONENTEXTERNALPAGEDOWNLOADPAGES_TYPE {
  Normal = "Normal",
  Online = "Online",
}

export interface ComponentExternalPageDownloadPageInput {
  name: string;
  url: string;
  Type?: ENUM_COMPONENTEXTERNALPAGEDOWNLOADPAGES_TYPE | null;
}

export interface DownloadListInput {
  id_mal?: string | null;
  id_anilist?: string | null;
  image?: string | null;
  mangas?: string | null;
  downloadPages?: (ComponentExternalPageDownloadPageInput | null)[] | null;
  created_by?: string | null;
  updated_by?: string | null;
}

export interface FavoriteInput {
  user?: string | null;
  mangases?: (string | null)[] | null;
  created_by?: string | null;
  updated_by?: string | null;
}

export interface InputID {
  id: string;
}

export interface ReaderInput {
  user?: string | null;
  readers?: any | null;
  onlyUpdate?: boolean | null;
  created_by?: string | null;
  updated_by?: string | null;
}

export interface UsersPermissionsRegisterInput {
  username: string;
  email: string;
  password: string;
}

export interface WishlistInput {
  user?: (string | null)[] | null;
  mangases?: (string | null)[] | null;
  wishs?: any | null;
  created_by?: string | null;
  updated_by?: string | null;
}

export interface createDownloadListInput {
  data?: DownloadListInput | null;
}

export interface createFavoriteInput {
  data?: FavoriteInput | null;
}

export interface createReaderInput {
  data?: ReaderInput | null;
}

export interface createWishlistInput {
  data?: WishlistInput | null;
}

export interface editFavoriteInput {
  user?: string | null;
  mangases?: (string | null)[] | null;
  created_by?: string | null;
  updated_by?: string | null;
}

export interface editReaderInput {
  user?: string | null;
  readers?: any | null;
  onlyUpdate?: boolean | null;
  created_by?: string | null;
  updated_by?: string | null;
}

export interface editWishlistInput {
  user?: (string | null)[] | null;
  mangases?: (string | null)[] | null;
  wishs?: any | null;
  created_by?: string | null;
  updated_by?: string | null;
}

export interface updateFavoriteInput {
  where?: InputID | null;
  data?: editFavoriteInput | null;
}

export interface updateReaderInput {
  where?: InputID | null;
  data?: editReaderInput | null;
}

export interface updateWishlistInput {
  where?: InputID | null;
  data?: editWishlistInput | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
