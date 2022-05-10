import { Story, Meta } from '@storybook/react/types-6-0'
import Button, { ButtonProps } from '.'

export default {
  title: 'Common/Button',
  component: Button,
  args: {
    children: 'Teste',
    border: 'circle'
  }
} as Meta

export const Default: Story<ButtonProps> = (args) => <Button {...args} />
