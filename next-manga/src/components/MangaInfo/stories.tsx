import { Story, Meta } from '@storybook/react/types-6-0'
import MangaInfo, { MangaInfoProps } from '.'

export default {
  title: 'MangaInfo',
  component: MangaInfo,
  args: {
    title: 'Solo Leveling',
    sinopse:
      'Dez anos atrás, depois do "Portal" que conecta o mundo real com um mundo de monstros se abriu, algumas pessoas comuns receberam o poder de caçar os monstros do portal. Eles são conhecidos como caçadores. Porém, nem todos os caçadores são fortes. Meu nome é Sung Jin-Woo, um caçador de rank E. Eu sou alguém que tem que arriscar a própria vida nas dungeons mais fracas, "O mais fraco do mundo". Sem ter nenhuma habilidade à disposição, eu mal consigo dinheiro nas dungeons de baixo nível... Ao menos até eu encontrar uma dungeon escondida com a maior dificuldade dentro do Rank D! No fim, enquanto aceitava minha morte, eu ganhei um novo poder...'
  }
} as Meta

export const Default: Story<MangaInfoProps> = (args) => <MangaInfo {...args} />
