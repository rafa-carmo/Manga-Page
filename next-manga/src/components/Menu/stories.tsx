import { Story, Meta } from '@storybook/react'
import Menu from '.'

export default {
  title: 'Menu',
  component: Menu,
  args: {}
} as Meta

export const Default: Story = (args) => <Menu {...args} />
