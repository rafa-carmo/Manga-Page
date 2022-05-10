import { parseQueryStringToWhere, parseQueryStringToFilter } from '.'

const filterItems = [
  { name: 'search', type: 'text' },
  { name: 'genres', type: 'checkbox' },
  { name: 'origin', type: 'checkbox' },
  { name: 'sort', type: 'text' }
]

const queryString = {
  search: 'Teste',
  genres: ['action', 'aventura'],
  origin: 'kr',
  sort: 'name:asc'
}

describe('parseQueryStringToWhere()', () => {
  it('should parse the query string to where format', () => {
    const parsedQuery = parseQueryStringToWhere({ queryString, filterItems })

    expect(parsedQuery).toStrictEqual({
      search: 'Teste',
      genres: { name_contains: ['action', 'aventura'] },
      origin: { name_contains: 'kr' }
    })
  })
})

describe('parseQueryStringToFilter()', () => {
  it('should parse the query string to filter to values format', () => {
    const parsedQuery = parseQueryStringToFilter({ queryString, filterItems })

    expect(parsedQuery).toStrictEqual({
      search: 'Teste',
      genres: ['action', 'aventura'],
      origin: ['kr'],
      sort: 'name:asc'
    })
  })
})
