import { PushNotification } from '@application/entities/push-notification'
import { InMemoryPushNotificationsRepository } from '@test/repositories/in-memory-push-notifications-repository'

describe('Find subscriptions by recipientId', () => {
  it('should be able to get subscriptions by id', async () => {
    const notificationRepository = new InMemoryPushNotificationsRepository()

    const pushNotification = new PushNotification({
      recipientId: '0',
      url: 'https://teste',
      auth: 'a',
      p256dh: 'a'
    })

    await notificationRepository.createSubscriptionNotificationUrl(
      pushNotification
    )
    await notificationRepository.createSubscriptionNotificationUrl(
      pushNotification
    )

    await notificationRepository.createSubscriptionNotificationUrl(
      new PushNotification({
        recipientId: '1',
        url: 'https://teste',
        auth: 'a',
        p256dh: 'a'
      })
    )

    const subscriptions = await notificationRepository.getUrlsByRecipientId('0')

    expect(subscriptions).toHaveLength(2)
  })
})
