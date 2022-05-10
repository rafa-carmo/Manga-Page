import { Story, Meta } from '@storybook/react/types-6-0'
import Cover, { CoverProps } from '.'

export default {
  title: 'Cover',
  component: Cover,
  args: {
    id: '01',
    favorite: false,
    img: '/images/mock/capas/The Second Coming of Gluttony.jpg',
    title: 'The Second Coming of Gluttony'
  }
} as Meta

export const Default: Story<CoverProps> = (args) => <Cover {...args} />
