import { Story, Meta } from '@storybook/react/types-6-0'
import MangaCard, { MangaCardProps } from '.'

export default {
  title: 'MangaCard',
  component: MangaCard,
  args: {
    title: 'Omniscient Readers Viewpoint Readers Viewpoint',
    img: 'https://umangas.club/assets/uploads/mangas/15bede30.jpg',
    genres: ['Ação', 'Aventura', 'Fantasia', 'Isekai', 'Webtoon'],
    scans: ['Neox Scanlator'],
    status: 'Lançamento'
  }
} as Meta

export const Default: Story<MangaCardProps> = (args) => <MangaCard {...args} />
