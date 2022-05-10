import { Story, Meta } from '@storybook/react/types-6-0'
import TopCard, { TopCardProps } from '.'

export default {
  title: 'TopCard',
  component: TopCard,
  args: {
    img: 'http://10.0.0.209:3333/imagens/mangas/capas/Kaijuu%208-gou.jpg',
    title: 'Kaijuu 8-gou',
    genres: ['teste', 'teste'],
    rating: '98',
    position: '01',
    type: 'Manga',
    release: '05'
  }
} as Meta

export const Default: Story<TopCardProps> = (args) => <TopCard {...args} />
