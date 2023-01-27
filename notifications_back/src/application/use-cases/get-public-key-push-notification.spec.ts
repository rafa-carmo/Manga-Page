import { InMemoryPushNotificationsRepository } from '@test/repositories/in-memory-push-notifications-repository'

describe('Get Public Key', () => {
  it('should be able to get a public key', async () => {
    const notificationRepository = new InMemoryPushNotificationsRepository()
    const publicKey = notificationRepository.getPublicKey()

    expect(publicKey !== '').toEqual(true)
  })
})
