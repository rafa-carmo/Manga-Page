import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository'
import { makeNotification } from '@test/factories/notifcation-factory'
import { SendNotification } from './send-notification'
import { InMemoryPushNotificationsRepository } from '@test/repositories/in-memory-push-notifications-repository'
import { DiscordReceivedNotification } from './discord-received-notification'
describe('Get Notifications', () => {
  it('should be able to get notifications by recipient where discord not received', async () => {
    const notificationRepository = new InMemoryNotificationsRepository()
    const pushNotification = new InMemoryPushNotificationsRepository()
    const createNotification = new SendNotification(
      notificationRepository,
      pushNotification
    )
    const receivedNotification = new DiscordReceivedNotification(
      notificationRepository
    )
    const notification = makeNotification({
      recipientId: 'recipient-1'
    })
    await createNotification.execute(notification)
    await createNotification.execute(notification)

    await receivedNotification.execute()

    await createNotification.execute(
      makeNotification({ recipientId: 'recipient-2' })
    )

    const notifications = await notificationRepository.findManyUnreceived()

    expect(notifications).toHaveLength(1)
  })
})
