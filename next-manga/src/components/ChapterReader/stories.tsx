import { Story, Meta } from '@storybook/react/types-6-0'
import ChapterReader, { ChapterReaderProps } from '.'
import mock from './mock'
export default {
  title: 'ChapterReader',
  component: ChapterReader,
  args: mock,
  parameters: {
    layout: 'fullscreen'
  }
} as Meta

export const Default: Story<ChapterReaderProps> = (args) => (
  <ChapterReader {...args} />
)
