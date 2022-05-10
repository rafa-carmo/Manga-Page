import { Story, Meta } from '@storybook/react/types-6-0'
import FilterDropdown, { FilterDropdownProps } from '.'

export default {
  title: 'FilterDropdown',
  component: FilterDropdown,
  args: {
    name: 'Generos',
    items: ['Ação', 'Aventura', 'Terror']
  }
} as Meta

export const Default: Story<FilterDropdownProps> = (args) => (
  <FilterDropdown {...args} />
)
