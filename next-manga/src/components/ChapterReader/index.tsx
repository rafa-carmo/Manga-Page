import * as S from './styles'

import { CaretLeft } from '@styled-icons/bootstrap/CaretLeft'
import { CaretRight } from '@styled-icons/bootstrap/CaretRight'
import { useEffect, useRef, useState } from 'react'

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
import { PageDropdown } from 'components/PageDropdown'
import OrientationPageSwitcher, {Orientation} from 'components/OrientationPageSwitcher';
import { useQuery } from '@apollo/client'
import { QUERY_GET_CHAPTERS } from 'graphql/queries/chapter'
import { QueryGetChaptersVariables, QueryGetChapters } from '../../graphql/generated/QueryGetChapters';
import Loading from 'templates/Loading'

export type ChapterReaderProps = {
  title: string
  atualChapter: string
  pages: string[]
  readerMode?: 'vertical' | 'horizontal'
  slug: string
  id: string
}

const ChapterReader = ({
  title,
  pages,
  readerMode = 'vertical',
  slug,
  id
}: ChapterReaderProps) => {
  const { query, push } = useRouter()
  // if (chapters) {
  //   StringToNumberMapper(chapters)
  // }


  const { data } = useQuery<QueryGetChapters, QueryGetChaptersVariables>(QUERY_GET_CHAPTERS, {
    variables: {
      slug
    },
    fetchPolicy: 'network-only'
  })

  const [mode, setMode] = useState(readerMode)
  const [slide, setSlide] = useState(0)
  const [atualPage, setAtualPage] = useState(0)
  const [atualChapter, setAtualChapter] = useState(String(query.chapter))
  const [chapters, setChapters] = useState<string[] | null>(null)

  //creating the ref
  const slider = useRef<SlickSlider>(null)

  const handleModeChanger = (value: Orientation) => {
    if (value === 'vertical') {
      setMode('vertical')
      return
    } 
    if (value === 'horizontal') {
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

  useEffect(() => {
    if (typeof window !== "undefined") {

      const orientation = localStorage.getItem("orientation");
      if (orientation) {
          setMode(orientation as Orientation);
          return
      }
      
      }
    setMode('vertical')
    
  }, [])
  
  useEffect(() => {
    data && setChapters(data?.chapters.map((chapter) => chapter.chapter))
  }, [data, slug])


  return (
    <S.Wrapper>
      <S.ChapterInfoContainer>
        {chapters ? (
          <PageDropdown chapters={chapters} selectedChapter={atualChapter} onChange={(changed) => handleChange(changed)}/>
        ) : (<Loading />) }
        
        {/* <PageDropdown chapters={pages} selectedChapter='0' onChange={goToPage} /> */}

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
              className="text-zinc-800"
                value={atualPage}
                onChange={(e) => goToPage(e.target.value)}
              >
                {pages.map((page, index) => (
                  <option className="text-zinc-800" key={`pagina-${page}`} value={index}>
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


        <OrientationPageSwitcher orientation={mode} setOrientation={handleModeChanger} />

      </S.ChapterInfoContainer>
     

   
  
      <S.PagesContent readerMode={mode}>
        {mode === 'vertical' ? (
          pages.map((page, index) => (
            <div key={`${title}-pagina-${index}`}>

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
        {chapters ? (

        
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
        ) : (<Loading />)}
      </BottomScrollListener>
    </S.Wrapper>
  )
}

export default ChapterReader
