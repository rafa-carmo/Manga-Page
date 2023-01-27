import { Content } from '@application/entities/content'
import { Notification } from '@application/entities/notification'
import { Injectable } from '@nestjs/common'
import { NotificationRepository } from '../repositories/notification-repository'

interface SendNotificationsRequest {
  recipientId: string
  content: Content
  mangaSlug: string
  chapter: string
}

interface SendNotificationResponse {
  notification: Notification
}

@Injectable()
export class SendNotification {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(
    request: SendNotificationsRequest
  ): Promise<SendNotificationResponse> {
    const { chapter, content, mangaSlug, recipientId } = request

    const notification = new Notification({
      chapter,
      content,
      mangaSlug,
      recipientId
    })

    await this.notificationRepository.create(notification)
    return { notification }
  }
}
