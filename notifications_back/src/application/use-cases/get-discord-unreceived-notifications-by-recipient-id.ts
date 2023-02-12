import { Injectable } from '@nestjs/common'
import { NotificationRepository } from '../repositories/notification-repository'

@Injectable()
export class GetDiscordUnreceivedNotifications {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute() {
    const notifications = await this.notificationRepository.findManyUnreceived()

    return notifications
  }
}
