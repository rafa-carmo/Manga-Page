import { makeNotification } from '@test/factories/notifcation-factory'
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository'
import { VerifyHasNotifications } from './verify-has-notification'

describe('Count recipient notifications', () => {
  it('should be able to verify if have notification for recipient', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const verifyHasNotification = new VerifyHasNotifications(
      notificationsRepository
    )

    await notificationsRepository.create(makeNotification())
    await notificationsRepository.create(makeNotification())
    await notificationsRepository.create(
      makeNotification({ recipientId: 'teste2' })
    )

    const hasNotification = await verifyHasNotification.execute({
      recipientId: '123'
    })

    expect(hasNotification).toEqual(true)
  })

  it('should be able to verify if not have notification for recipient', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const verifyHasNotification = new VerifyHasNotifications(
      notificationsRepository
    )

    await notificationsRepository.create(
      makeNotification({ readAt: new Date() })
    )
    await notificationsRepository.create(
      makeNotification({ readAt: new Date() })
    )

    const hasNotification = await verifyHasNotification.execute({
      recipientId: '123'
    })

    expect(hasNotification).toEqual(false)
  })
})
