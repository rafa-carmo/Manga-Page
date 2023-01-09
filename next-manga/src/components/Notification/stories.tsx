import { Story, Meta } from '@storybook/react/types-6-0'
import Notification, { NotificationProps} from '.'

export default {
  title: 'Notification',
  component: Notification,
  args: {}
} as Meta

export const Default: Story<NotificationProps> = (args) => <Notification  {...args}/>
