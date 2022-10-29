/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { createDownloadListInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createDownloadList
// ====================================================

export interface createDownloadList_createDownloadList_downloadList_downloadPages {
  __typename: "ComponentExternalPageDownloadPages";
  url: string;
}

export interface createDownloadList_createDownloadList_downloadList {
  __typename: "DownloadList";
  downloadPages: (createDownloadList_createDownloadList_downloadList_downloadPages | null)[] | null;
}

export interface createDownloadList_createDownloadList {
  __typename: "createDownloadListPayload";
  downloadList: createDownloadList_createDownloadList_downloadList | null;
}

export interface createDownloadList {
  createDownloadList: createDownloadList_createDownloadList | null;
}

export interface createDownloadListVariables {
  input?: createDownloadListInput | null;
}
