import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository'
import { makeNotification } from '@test/factories/notifcation-factory'

import { NotificationNotFound } from './errors/notification-not-found'
import { UnreadNotification } from './unread-notification'
describe('Read Notification', () => {
  it('should be able to unread a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const readNotification = new UnreadNotification(notificationsRepository)

    const notification = makeNotification()

    await notificationsRepository.create(notification)
    await readNotification.execute({ notificationId: notification.id })

    expect(notificationsRepository.notifications[0].readAt).toBeNull()
  })

  it('Should not be able to unread a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const readNotification = new UnreadNotification(notificationsRepository)

    expect(() => {
      return readNotification.execute({ notificationId: 'fake-id' })
    }).rejects.toThrow(NotificationNotFound)
  })
})
