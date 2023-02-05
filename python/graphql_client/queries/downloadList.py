from gql import gql
class DownloadLists:
  gql = gql(""" 
    {
          downloadLists(sort: "id:asc") {
            id
            mangas {
              id
              title
              slug
            }
            downloadPages {
              name
              url
              Type
            }
          }}
      
  """)
