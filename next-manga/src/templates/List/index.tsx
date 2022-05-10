import Base from 'templates/Base'
import GridManga from 'components/GridManga'
import { MangaCardMapper } from 'utils/mappers'
import { QueryPageMangas_mangas } from 'graphql/generated/QueryPageMangas'
import { Container } from 'components/Container'
import Heading from 'components/Heading'

export type ListProps = {
  list?: QueryPageMangas_mangas[]
  title: string
}

const List = ({ list, title }: ListProps) => {
  return (
    <Base>
      <Container>
        {title && (
          <Heading size="medium" lineLeft>
            {title}
          </Heading>
        )}
        {list ? (
          <GridManga items={MangaCardMapper(list)} />
        ) : (
          <div style={{ color: 'white' }}>Vazio</div>
        )}
      </Container>
    </Base>
  )
}

export default List
