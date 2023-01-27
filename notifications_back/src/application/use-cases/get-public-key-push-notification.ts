import { Injectable } from '@nestjs/common'
import { PushNotificationRepository } from '@application/repositories/push-notification-repository'

@Injectable()
export class GetPublicKey {
  constructor(private pushNotificationRepository: PushNotificationRepository) {}

  async execute() {
    const publicKey = this.pushNotificationRepository.getPublicKey()
    return {
      publicKey
    }
  }
}
