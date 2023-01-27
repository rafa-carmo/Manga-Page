import { Notification as RawNotification } from '@prisma/client'
import { Notification } from '@application/entities/notification'
import { Content } from '@application/entities/content'

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      content: notification.content.value,
      recipientId: notification.recipientId,
      readAt: notification.readAt,
      createdAt: notification.createAt,
      mangaSlug: notification.mangaSlug,
      chapter: notification.chapter
    }
  }

  static toDomain(raw: RawNotification): Notification {
    return new Notification(
      {
        content: new Content(raw.content),
        createAt: raw.createdAt,
        readAt: raw.readAt,
        recipientId: raw.recipientId,
        mangaSlug: raw.mangaSlug,
        chapter: raw.chapter
      },
      raw.id
    )
  }
}
