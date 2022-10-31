import { NextApiRequest, NextApiResponse } from 'next';
import { useQuery } from '@apollo/client';
import { QueryChaptersById, QueryChaptersByIdVariables } from '../../graphql/generated/QueryChaptersById';
import { QUERY_CHAPTERS_BY_ID } from '../../graphql/queries/mangas';
import { initializeApollo } from 'utils/apollo'

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    if(req.method === 'GET') {

        const apolloClient = initializeApollo()
        const { id } = req.query
        console.log(id)
        if(!id){
            return res.status(400)
        }
        if(typeof id !== 'string') {
            return res.status(400)
        }



        const {data} = await apolloClient.query<QueryChaptersById,QueryChaptersByIdVariables>({
            query: QUERY_CHAPTERS_BY_ID,
            variables: {
              id: parseInt(id as string)
            },
            fetchPolicy: 'no-cache'
          })
  

      return res.json(data)
    }

    return res.status(404)
}

