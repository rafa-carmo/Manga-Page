import { Story, Meta } from '@storybook/react/types-6-0'
import MangaReleasedList, { MangaReleasedListProps } from '.'
import mangaMock from './mock'

export default {
  title: 'MangaReleasedList',
  component: MangaReleasedList,
  args: {
    items: mangaMock
  }
} as Meta

export const Default: Story<MangaReleasedListProps> = (args) => (
  <MangaReleasedList {...args} />
)
