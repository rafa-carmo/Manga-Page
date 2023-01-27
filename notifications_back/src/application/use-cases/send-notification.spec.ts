import { SendNotification } from './send-notification'

import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository'
import { makeNotification } from '../../../test/factories/notifcation-factory'

describe('Send Notification', () => {
  it('Should be able to send a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const sendNotification = new SendNotification(notificationsRepository)

    await sendNotification.execute(makeNotification())

    expect(notificationsRepository.notifications).toHaveLength(1)
  })
})
