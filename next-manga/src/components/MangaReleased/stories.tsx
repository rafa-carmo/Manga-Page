import { Story, Meta } from '@storybook/react/types-6-0'
import MangaReleased, { MangaReleasedProps } from '.'

export default {
  title: 'MangaReleased',
  component: MangaReleased,
  args: {
    title: 'Omniscient Readers Viewpoint Readers Viewpoint',
    img: 'https://umangas.club/assets/uploads/mangas/15bede30.jpg',
    chapters: [
      {
        chapter: '01',
        scan: 'Neox Scanlator',
        date: '2015-01-05 22:32:42.648+00'
      },
      {
        chapter: '02',
        scan: 'Neox Scanlator',
        date: '2021-05-17 22:32:42.648+00'
      },
      {
        chapter: '03',
        scan: 'Apenas mais um yaoi na sua timeline',
        date: '2021-09-17 22:32:42.648+00'
      }
    ]
  }
} as Meta

export const Default: Story<MangaReleasedProps> = (args) => (
  <MangaReleased {...args} />
)
