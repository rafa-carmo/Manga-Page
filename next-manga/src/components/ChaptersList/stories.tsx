import { Story, Meta } from '@storybook/react/types-6-0'
import ChaptersList, { ChaptersListProps } from '.'

export default {
  title: 'ChaptersList',
  component: ChaptersList,
  args: {
    items: [
      {
        chapter: '01',
        scan: 'alguma scan qualquer'
      },
      {
        chapter: '02',
        scan: 'alguma scan qualquer'
      },
      {
        chapter: '03',
        scan: 'alguma scan qualquer'
      },
      {
        chapter: '04',
        scan: 'alguma scan qualquer'
      },
      {
        chapter: '05',
        scan: 'alguma scan qualquer'
      }
    ]
  }
} as Meta

export const Default: Story<ChaptersListProps> = (args) => (
  <ChaptersList {...args} />
)
