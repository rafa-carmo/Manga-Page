import Heading from 'components/Heading'
import MangaCard, { MangaCardProps } from 'components/MangaCard'
import Slider, { SliderSettings } from 'components/Slider'
import { ArrowBackIos as ArrowLeft } from '@styled-icons/material-outlined'
import { ArrowForwardIos as ArrowRight } from '@styled-icons/material-outlined'
import * as S from './styles'

export type NewsBannerProps = {
  items: MangaCardProps[]
  color?: 'black' | 'white'
  heading: string
}

const settings: SliderSettings = {
  slidesToShow: 6,
  lazyLoad: 'ondemand',
  infinite: true,
  slidesToScroll: 3,
  autoplay: true,
  autoplaySpeed: 6000,
  pauseOnFocus: true,
  pauseOnHover: true,
  speed: 1000,
  responsive: [
    {
      breakpoint: 1375,
      settings: {
        arrows: false,
        slidesToShow: 4.2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 1024,
      settings: {
        arrows: false,
        slidesToShow: 2.6,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 570,
      settings: {
        infinite: false,
        arrows: false,
        slidesToShow: 1.6,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 375,
      settings: {
        arrows: false,
        infinite: false,
        slidesToShow: 1.2,
        slidesToScroll: 1
      }
    }
  ],
  nextArrow: <ArrowRight aria-label="next games" />,
  prevArrow: <ArrowLeft aria-label="prev games" />
}

const NewsBanner = ({ items, color = 'white', heading }: NewsBannerProps) => (
  <S.Wrapper color={color}>
    <S.Head>
      <Heading lineColor="primary" lineLeft>
        {heading}
      </Heading>
    </S.Head>
    <S.Slider>
      <Slider settings={settings}>
        {items.slice(0, 10).map((item, index) => (
          <MangaCard key={`${item.title}-${index}`} {...item} />
        ))}
      </Slider>
    </S.Slider>
  </S.Wrapper>
)

export default NewsBanner
