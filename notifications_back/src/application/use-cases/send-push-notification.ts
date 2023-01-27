import { Injectable } from '@nestjs/common'
import { PushNotificationRepository } from '@application/repositories/push-notification-repository'
import { PushNotification } from '@application/entities/push-notification'

@Injectable()
export class SendPushNotification {
  constructor(private pushNotificationRepository: PushNotificationRepository) {}

  async execute(notification: PushNotification, message: string) {
    this.pushNotificationRepository.sendPushNotification(notification, message)
  }
}
