import { Injectable } from '@nestjs/common'
import { NotificationRepository } from '../repositories/notification-repository'
import { NotificationNotFound } from './errors/notification-not-found'

interface ReadNotificationProps {
  notificationId: string
}

@Injectable()
export class ReadNotification {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(request: ReadNotificationProps) {
    const { notificationId } = request

    const notification = await this.notificationRepository.findById(
      notificationId
    )

    if (!notification) {
      throw new NotificationNotFound()
    }
    notification.read()
    await this.notificationRepository.save(notification)
    return
  }
}
