import { Injectable } from '@nestjs/common'
import { PushNotificationRepository } from '@application/repositories/push-notification-repository'

@Injectable()
export class FindSubscriptionsUrlsById {
  constructor(private pushNotificationRepository: PushNotificationRepository) {}

  async execute(recipientId: string) {
    const notifications =
      await this.pushNotificationRepository.getUrlsByRecipientId(recipientId)
    return notifications
  }
}
