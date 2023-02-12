import { Injectable } from '@nestjs/common'
import { NotificationRepository } from '../repositories/notification-repository'

@Injectable()
export class DiscordReceivedNotification {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute() {
    await this.notificationRepository.markReceivedNotifications()
    return
  }
}
