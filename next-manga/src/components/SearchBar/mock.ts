export default [
  {
    title: 'Buscar',
    name: 'name',
    type: 'text'
  },
  {
    title: 'Generos',
    name: 'genres',
    type: 'checkbox',
    fields: [
      { label: 'Ação', value: 'acao' },
      { label: 'Aventura', value: 'aventura' },
      { label: 'Isekai', value: 'isekai' }
    ]
  },
  {
    title: 'Pais de Origem',
    name: 'origen',
    type: 'checkbox',
    fields: [
      { label: 'Japão', value: 'jp' },
      { label: 'Coreia', value: 'kr' },
      { label: 'China', value: 'ch' }
    ]
  },
  {
    title: 'Status',
    name: 'status',
    type: 'checkbox',
    fields: [
      { label: 'Finalizado', value: 'finished' },
      { label: 'Lançamento', value: 'releasing' },
      { label: 'Hiato', value: 'hiatus' }
    ]
  }
]
