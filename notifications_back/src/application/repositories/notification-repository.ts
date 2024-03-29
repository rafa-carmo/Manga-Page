import { Notification } from '@application/entities/notification'

export abstract class NotificationRepository {
  abstract create(notification: Notification): Promise<void>
  abstract haveNotification(recipientId: string): Promise<boolean>
  abstract findById(notificationId: string): Promise<Notification | null>
  abstract findMany(recipientId: string): Promise<Notification[]>
  abstract findManyUnreceived(): Promise<Notification[]>
  abstract markReceivedNotifications(): Promise<void>
  abstract save(notification: Notification): Promise<void>
}
