import { SendNotification } from './send-notification'

import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository'
import { makeNotification } from '../../../test/factories/notifcation-factory'
import { InMemoryPushNotificationsRepository } from '@test/repositories/in-memory-push-notifications-repository'

describe('Send Notification', () => {
  it('Should be able to send a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const pushNotification = new InMemoryPushNotificationsRepository()
    const sendNotification = new SendNotification(
      notificationsRepository,
      pushNotification
    )

    await sendNotification.execute(makeNotification())

    expect(notificationsRepository.notifications).toHaveLength(1)
  })
})
