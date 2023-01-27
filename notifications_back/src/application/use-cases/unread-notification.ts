import { NotificationRepository } from '@application/repositories/notification-repository'
import { Injectable } from '@nestjs/common'
import { NotificationNotFound } from './errors/notification-not-found'

interface UnreadNotificationProps {
  notificationId: string
}

@Injectable()
export class UnreadNotification {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(request: UnreadNotificationProps) {
    const { notificationId } = request
    const notification = await this.notificationRepository.findById(
      notificationId
    )

    if (!notification) {
      return new NotificationNotFound()
    }

    notification.unread()
    await this.notificationRepository.save(notification)
    return
  }
}
