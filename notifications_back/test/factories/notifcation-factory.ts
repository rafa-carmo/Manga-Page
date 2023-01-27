import { Content } from '@application/entities/content'
import {
  Notification,
  NotificationProps
} from '@application/entities/notification'

type Override = Partial<NotificationProps>

export function makeNotification(override?: Override, id?: string) {
  return new Notification(
    {
      content: new Content('Novo capitulo de manga - '),
      recipientId: '123',
      chapter: '01',
      mangaSlug: 'Manga',
      ...override
    },
    id
  )
}
