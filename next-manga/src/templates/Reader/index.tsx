import ChapterReader, {
  ChapterReaderProps
} from 'components/ChapterReader/index'
import Base from 'templates/Base'
import Head from 'next/head'

export type ReaderProps = {
  chapter: ChapterReaderProps
}

const Reader = ({ chapter }: ReaderProps) => (
  <Base
    manga={{
      title: chapter.title,
      slug: chapter.slug
    }}
  >
    <Head>
      <title>
        Leitor - {chapter.title} - Capitulo {chapter.atualChapter}
      </title>

      <meta
        name="description"
        content={`Leitor online - ${chapter.title} - capitulo ${chapter.atualChapter}`}
      />
    </Head>
    <ChapterReader {...chapter} />
  </Base>
)

export default Reader
