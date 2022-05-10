import { Story, Meta } from '@storybook/react/types-6-0'
import List, { ListProps } from '.'

export default {
  title: 'List',
  component: List,
  args: {}
} as Meta

export const Default: Story<ListProps> = (args) => <List {...args} />
