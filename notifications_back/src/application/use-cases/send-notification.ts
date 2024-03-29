import { Content } from '@application/entities/content'
import { Notification } from '@application/entities/notification'
import { PushNotificationRepository } from '@application/repositories/push-notification-repository'
import { Injectable } from '@nestjs/common'
import { NotificationRepository } from '../repositories/notification-repository'

interface SendNotificationsRequest {
  recipientId: string
  content: Content
  mangaSlug: string
  chapter: string
  discordId?: string | null
}

interface SendNotificationResponse {
  notification: Notification
}

@Injectable()
export class SendNotification {
  constructor(
    private notificationRepository: NotificationRepository,
    private pushNotificationRepository: PushNotificationRepository
  ) {}

  async execute(
    request: SendNotificationsRequest
  ): Promise<SendNotificationResponse> {
    const { chapter, content, mangaSlug, recipientId, discordId } = request

    const notification = new Notification({
      chapter,
      content,
      mangaSlug,
      recipientId,
      discordId
    })

    await this.notificationRepository.create(notification)

    const registrationsUrls =
      await this.pushNotificationRepository.getUrlsByRecipientId(recipientId)
    registrationsUrls.map((registration) =>
      this.pushNotificationRepository.sendPushNotification(
        registration,
        content.value
      )
    )
    return { notification }
  }
}
