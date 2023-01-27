import { Notification } from '../entities/notification'

export abstract class NotificationRepository {
  abstract create(notification: Notification): Promise<void>
  abstract haveNotification(recipientId: string): Promise<boolean>
  abstract findById(notificationId: string): Promise<Notification | null>
  abstract findMany(recipientId: string): Promise<Notification[]>
  abstract save(notification: Notification): Promise<void>
}
