import * as S from './styles'
import TopCard, { TopCardProps } from 'components/TopCard/index'
import { Divider } from 'components/Divider/index'

export type TopCardListProps = {
  items: TopCardProps[]
}

const TopCardList = ({ items }: TopCardListProps) => (
  <S.Wrapper>
    {items.map((item, index) => (
      <div key={`toplist-${item.title}-${index}`}>
        <TopCard {...item} />
        <Divider space="xxsmall" />
      </div>
    ))}
  </S.Wrapper>
)

export default TopCardList
