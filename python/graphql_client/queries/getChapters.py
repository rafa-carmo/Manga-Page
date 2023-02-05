from gql import gql
class GetChapters:
  gql = gql(""" 
          query chapters($id: Int) {
            chapters(where: {mangas: {id: $id}}){
                chapter
            }
          }
      
  """)
