import * as S from './styles'

import { CaretLeft } from '@styled-icons/bootstrap/CaretLeft'
import { CaretRight } from '@styled-icons/bootstrap/CaretRight'
import { useRef, useState } from 'react'

import Slider, { SliderSettings } from 'components/Slider'
import SlickSlider from 'react-slick'
import { useRouter } from 'next/router'
import Button from 'components/Button'
import { BottomScrollListener } from 'react-bottom-scroll-listener'
import { useReader } from 'hooks/use-reader'
import { useSession } from 'next-auth/client'
// import Image from 'next/image'
import { StringToNumberMapper } from '../../utils/mappers'
import Selector from 'components/Selector'

export type ChapterReaderProps = {
  title: string
  chapters: string[]
  atualChapter: string
  pages: string[]
  readerMode?: 'vertical' | 'horizontal'
  slug: string
  id: string
}

const ChapterReader = ({
  title,
  chapters,
  pages,
  readerMode = 'vertical',
  slug,
  id
}: ChapterReaderProps) => {
  const { query, push } = useRouter()
  if (chapters) {
    StringToNumberMapper(chapters)
  }
  const [mode, setMode] = useState(readerMode)
  const [slide, setSlide] = useState(0)
  const [atualPage, setAtualPage] = useState(0)
  const [atualChapter, setAtualChapter] = useState(String(query.chapter))

  //creating the ref
  const slider = useRef<SlickSlider>(null)

  const handleModeChanger = (value: string) => {
    if (value === 'vertical') {
      setMode('vertical')
    } else if (value === 'horizontal') {
      setSlide(0)
      setAtualPage(0)
      setMode('horizontal')
    }
  }

  const goToNext = () => {
    if (slide + 1 === pages.length) {
      return
    }
    //slider.current?.slickNext()
    slider.current?.slickGoTo(atualPage + 1)
    setAtualPage(atualPage + 1)
    if (window.scrollY >= 200) {
      window.scroll({
        top: 180,
        left: 0,
        behavior: 'smooth'
      })
    }
  }
  const goToPrev = () => {
    slider.current?.slickGoTo(atualPage - 1)
    if (window.scrollY >= 200) {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }
    setAtualPage(atualPage - 1)
  }

  const goToPage = (target: string) => {
    const value = parseInt(target)
    setAtualPage(value)
    slider.current?.slickGoTo(value)
  }

  const settings: SliderSettings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: true,
    fade: true,
    draggable: false,
    beforeChange: (_, next) => {
      setSlide(next)
    }
  }

  const handleChange = (chapter: string | undefined) => {
    if (!chapter) {
      push(`/manga/${slug}`)
      return
    }
    if (session) {
      addToReader([id])
    }
    goToPage('0')
    if (chapter !== query.chapter) {
      setAtualChapter(chapter)
      push(`/reader/${slug}/${chapter}`)
      return
    }
  }

  const [session] = useSession()
  const { addToReader } = useReader()
  const onBottomReader = () => {
    if (session) {
      addToReader([id])
    }
  }

  return (
    <S.Wrapper>
      <S.ChapterInfoContainer>
        {/* <S.Select
          defaultValue={atualChapter}
          onChange={(e) => handleChange(e.target.value)}
        >
          {chapters.map((chapter) => {
            return (
              <option value={chapter} key={`capitulo-${chapter}`}>
                Capitulo {chapter}
              </option>
            )
          })}
        </S.Select> */}
        <Selector
          select={atualChapter}
          options={chapters}
          preText="Capitulo"
          onChange={(e) => handleChange(e.target.value)}
        />
        <S.ReaderModeColtroller>
          <Selector
            select={mode}
            options={['vertical', 'horizontal']}
            onChange={(e) => handleModeChanger(e.target.value)}
          />
          {/* <S.Select value={mode} onChange={handleModeChanger}>
            <option value="vertical">Pagina Inteira</option>
            <option value="horizontal">Passar Paginas</option>
          </S.Select> */}
        </S.ReaderModeColtroller>
      </S.ChapterInfoContainer>
      {mode === 'horizontal' && (
        <S.PageController>
          <>
            {slide !== 0 && (
              <CaretLeft
                size={24}
                color="#FFF"
                role="button"
                onClick={goToPrev}
              />
            )}
            <S.Select
              value={atualPage}
              onChange={(e) => goToPage(e.target.value)}
            >
              {pages.map((page, index) => (
                <option key={`pagina-${page}`} value={index}>
                  Pagina - {index + 1}
                </option>
              ))}
            </S.Select>
            {slide + 1 !== pages.length && (
              <CaretRight
                size={24}
                color="#FFF"
                role="button"
                onClick={goToNext}
              />
            )}
          </>
        </S.PageController>
      )}

      <S.PagesContent readerMode={mode}>
        {mode === 'vertical' ? (
          pages.map((page, index) => (
            <div key={`${title}-pagina-${index}`}>
              {/* <Image
                src={page}
                aria-label={title}
                layout="fill"
                object-fit="cover"
              /> */}
              <S.Page alt={title} src={page} />
            </div>
          ))
        ) : (
          <Slider ref={slider} settings={settings}>
            {pages.map((page, index) => (
              <S.Page
                key={`${title}-pagina-${index}`}
                alt={title}
                src={page}
                onClick={goToNext}
              />
            ))}
          </Slider>
        )}
      </S.PagesContent>
      <BottomScrollListener onBottom={onBottomReader}>
        <S.PageController>
          <Button
            as="button"
            onClick={() =>
              handleChange(chapters[chapters.indexOf(atualChapter) + 1])
            }
          >
            Proximo Capitulo
          </Button>
          {slide + 1 === pages.length ? (
            atualChapter === chapters[chapters.length - 1] ? (
              'Fim dos capitulos'
            ) : (
              <Button
                as="button"
                onClick={() =>
                  handleChange(chapters[chapters.indexOf(atualChapter) + 1])
                }
              >
                Proximo Capitulo
              </Button>
            )
          ) : (
            <>
              <CaretLeft
                size={24}
                color="#FFF"
                role="button"
                onClick={goToPrev}
              />
              <CaretRight
                size={24}
                color="#FFF"
                role="button"
                onClick={goToNext}
              />
            </>
          )}
        </S.PageController>
      </BottomScrollListener>
    </S.Wrapper>
  )
}

export default ChapterReader
