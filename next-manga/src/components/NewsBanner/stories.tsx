import { Story, Meta } from '@storybook/react/types-6-0'
import NewsBanner, { NewsBannerProps } from '.'
import mock from 'components/GridManga/mock'

export default {
  title: 'NewsBanner',
  component: NewsBanner,
  args: {
    items: mock
  }
} as Meta

export const Default: Story<NewsBannerProps> = (args) => (
  <NewsBanner {...args} />
)
