import { Story, Meta } from '@storybook/react/types-6-0'
import Selector, { SelectorProps } from '.'

export default {
  title: 'Selector',
  component: Selector,
  args: {
    select: 'Teste 01',
    options: ['Teste 01', 'Teste 02', 'Teste 03']
  }
} as Meta

export const Default: Story<SelectorProps> = (args) => <Selector {...args} />
