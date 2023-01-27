import { Notification } from '@application/entities/notification'
export class NotificationViewModel {
  static toHttp(notification: Notification) {
    return {
      id: notification.id,
      content: notification.content.value,
      mangaSlug: notification.mangaSlug,
      chapter: notification.chapter,
      createdAt: notification.createAt,
      readAt: notification.readAt,
      recipientId: notification.recipientId
    }
  }
}
