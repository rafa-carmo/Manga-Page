import { Injectable } from '@nestjs/common'
import { PushNotificationRepository } from '@application/repositories/push-notification-repository'
import { PushNotification } from '@application/entities/push-notification'

interface CreateNotificationRequest {
  recipientId: string
  url: string
  p256dh: string
  auth: string
}

@Injectable()
export class CreateSubscriptionNotificationUrl {
  constructor(private pushNotificationRepository: PushNotificationRepository) {}

  async execute(request: CreateNotificationRequest) {
    const pushNotification = new PushNotification(request)
    await this.pushNotificationRepository.createSubscriptionNotificationUrl(
      pushNotification
    )
  }
}
