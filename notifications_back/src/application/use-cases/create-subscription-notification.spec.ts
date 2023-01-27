import { PushNotification } from '@application/entities/push-notification'
import { InMemoryPushNotificationsRepository } from '@test/repositories/in-memory-push-notifications-repository'

describe('Create subscription', () => {
  it('should be able to create a subscription to push notification', async () => {
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

    expect(notificationRepository.pushNotificationsUrls).toHaveLength(1)
  })
})
