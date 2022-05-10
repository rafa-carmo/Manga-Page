import { Story, Meta } from '@storybook/react/types-6-0'
import TopCardList, { TopCardListProps } from '.'
import mock from './mock'

export default {
  title: 'TopCardList',
  component: TopCardList,
  args: { items: mock }
} as Meta

export const Default: Story<TopCardListProps> = (args) => (
  <TopCardList {...args} />
)
