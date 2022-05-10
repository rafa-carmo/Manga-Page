import { Story, Meta } from '@storybook/react/types-6-0'
import GridManga, { GridMangaProps } from '.'
import mockMangas from './mock'

export default {
  title: 'GridManga',
  component: GridManga,
  args: {
    items: mockMangas
  }
} as Meta

export const Default: Story<GridMangaProps> = (args) => <GridManga {...args} />
