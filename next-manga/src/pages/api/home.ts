import { NextApiRequest, NextApiResponse } from 'next';
import { initializeApollo } from 'utils/apollo'
import { QueryReleasedChapters, QueryReleasedChaptersVariables } from '../../graphql/generated/QueryReleasedChapters';
import { QUERY_RELEASE_CHAPTERS } from '../../graphql/queries/home';

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    if(req.method === 'GET') {

        const apolloClient = initializeApollo()
        const { start, end } = req.query

        const startIn = () => {
            if(start) {
                return parseInt(`${start}`)
            }
            return 0
        }

        const endIn = () => {
            if(end) {
                return parseInt(`${end}`)
            }
            return 20
        }

        const {data} = await apolloClient.query< QueryReleasedChapters,QueryReleasedChaptersVariables>({
            query: QUERY_RELEASE_CHAPTERS,
            variables: {
              start: startIn(),
              limit: endIn()
            },
            fetchPolicy: 'no-cache'
          })

      return res.json(data.chapters)
    }

    return res.status(404)
}

