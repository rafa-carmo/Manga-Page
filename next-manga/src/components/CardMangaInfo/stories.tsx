import { Story, Meta } from '@storybook/react/types-6-0'

import CardMangaInfo, { CardMangaInfoProps } from '.'

export default {
  title: 'CardMangaInfo',
  component: CardMangaInfo,
  args: {
    type: 'Manwhua',
    author: 'So-Ryeong Gi',
    artist: 'Seong-Rak Jang',
    chapters: '171',
    status: 'Lançamento',
    romanjiName: 'Na Honjaman Level Up',
    englishName: 'Solo Leveling',
    nativeName: '나 혼자만 레벨업',
    genres: ['Action', 'Adventure', 'Fantasy']
  }
} as Meta

export const Default: Story<CardMangaInfoProps> = (args) => (
  <CardMangaInfo {...args} />
)
