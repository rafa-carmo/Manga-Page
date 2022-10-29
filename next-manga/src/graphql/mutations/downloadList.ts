import { gql } from '@apollo/client'

export const MUTATION_CREATE_DOWNLOAD_LIST = gql`
    mutation createDownloadList($input: createDownloadListInput) {
        createDownloadList(input: $input) {
        downloadList {
            downloadPages {
            url
            }
        }
        }
    }
  
`

