import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository'
import { makeNotification } from '@test/factories/notifcation-factory'
import { ReadNotification } from './read-notification'
import { NotificationNotFound } from './errors/notification-not-found'
describe('Read Notification', () => {
  it('should be able to read a notification', async () => {
    const notificationRepository = new InMemoryNotificationsRepository()
    const readNotification = new ReadNotification(notificationRepository)

    const notification = makeNotification()

    await notificationRepository.create(notification)
    await readNotification.execute({ notificationId: notification.id })

    expect(notificationRepository.notifications[0].readAt).toEqual(
      expect.any(Date)
    )
  })

  it('Should not be able to read a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const readNotification = new ReadNotification(notificationsRepository)

    expect(() => {
      return readNotification.execute({ notificationId: 'fake-id' })
    }).rejects.toThrow(NotificationNotFound)
  })
})
