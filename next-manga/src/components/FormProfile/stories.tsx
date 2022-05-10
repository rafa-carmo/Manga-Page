import { Story, Meta } from '@storybook/react/types-6-0'
import FormProfile, { FormProfileProps } from '.'

export default {
  title: 'FormProfile',
  component: FormProfile,
  args: {
    name: 'Rafael',
    image: 'http://192.168.5.27:3333/imagens/mangas/banner/Solo%20Leveling.jpg'
  }
} as Meta

export const Default: Story<FormProfileProps> = (args) => (
  <FormProfile {...args} />
)
