import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository'
import { makeNotification } from '@test/factories/notifcation-factory'

import { DiscordReceivedNotification } from './discord-received-notification'

describe('Mark discord notified', () => {
  it('should be able to mark a notification to received', async () => {
    const notificationRepository = new InMemoryNotificationsRepository()
    const receivedNotification = new DiscordReceivedNotification(
      notificationRepository
    )

    const notification = makeNotification()

    await notificationRepository.create(notification)
    await receivedNotification.execute()

    expect(notificationRepository.notifications[0].discordNotified).toBe(true)
  })
})
