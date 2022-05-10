import * as S from './styles'
import { MangaCardProps } from '../../components/MangaCard/index'
import MangaCard from 'components/MangaCard'
import Base from 'templates/Base'

export type DownloadListProps = {
  items: MangaCardProps[]
}

const DownloadList = ({ items }: DownloadListProps) => (
  <Base>
    <S.Wrapper>
      {items.map((item) => (
        <MangaCard key={item.title} {...item} />
      ))}
    </S.Wrapper>
  </Base>
)

export default DownloadList
