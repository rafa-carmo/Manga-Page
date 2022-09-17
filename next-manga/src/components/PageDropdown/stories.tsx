import { Story, Meta } from '@storybook/react/types-6-0'
import {PageDropdown} from '.'
import { PageDropdownProps } from './index';

export default {
  title: 'Reader/NewsBanner',
  component: PageDropdown,
  args: {
    chapters: Array.from(Array(50).keys()),
    selectedChapter: 'Chapter 5'
  }
} as Meta

export const Default: Story<PageDropdownProps> = (args) => (
  <div className='grid place-items-center w-full h-full'>
    <PageDropdown {...args} />
  </div>
)
