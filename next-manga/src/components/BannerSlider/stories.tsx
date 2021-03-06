import { Story, Meta } from '@storybook/react/types-6-0'
import BannerSlider, { BannerSliderProps } from '.'
import mock from './mock'

export default {
  title: 'BannerSlider',
  component: BannerSlider,
  args: { items: mock }
} as Meta

export const Default: Story<BannerSliderProps> = (args) => (
  <BannerSlider {...args} />
)
