import { Story, Meta } from '@storybook/react/types-6-0'
import OrientationPageSwitcher, { OrientationPageSwitcherProps }  from '.'


export default {
  title: 'Reader/OrientationPageSwitcher',
  component: OrientationPageSwitcher,
  args: {
    orientation: 'horizontal',
    setOrientation: () => {}
  }
} as Meta

export const Default: Story<OrientationPageSwitcherProps> = (args) => (
  <div className='grid place-items-center w-full h-full'>
    <OrientationPageSwitcher {...args} />
  </div>
)
