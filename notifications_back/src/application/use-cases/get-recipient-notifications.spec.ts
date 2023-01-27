import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository'
import { makeNotification } from '@test/factories/notifcation-factory'
import { SendNotification } from './send-notification'
import { InMemoryPushNotificationsRepository } from '@test/repositories/in-memory-push-notifications-repository'
describe('Get Notifications', () => {
  it('should be able to get notifications by recipient', async () => {
    const notificationRepository = new InMemoryNotificationsRepository()
    const pushNotification = new InMemoryPushNotificationsRepository()
    const createNotification = new SendNotification(
      notificationRepository,
      pushNotification
    )

    const notification = makeNotification({ recipientId: 'recipient-1' })
    createNotification.execute(notification)
    createNotification.execute(notification)

    createNotification.execute(makeNotification({ recipientId: 'recipient-2' }))

    const notifications = await notificationRepository.findMany('recipient-1')

    expect(notifications).toHaveLength(2)
  })
})
