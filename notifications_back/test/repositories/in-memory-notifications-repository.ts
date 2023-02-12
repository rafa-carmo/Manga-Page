import { Notification } from '@application/entities/notification'
import { NotificationRepository } from '@application/repositories/notification-repository'

export class InMemoryNotificationsRepository implements NotificationRepository {
  public notifications: Notification[] = []

  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification)
  }

  async haveNotification(recipientId: string): Promise<boolean> {
    const hasNotificaiton = this.notifications.find((notification) => {
      if (notification.recipientId === recipientId) {
        if (!notification.readAt) {
          return true
        }
      }
    })

    return !!hasNotificaiton
  }

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = this.notifications.find(
      (notification) => notification.id === notificationId
    )

    if (!notification) {
      return null
    }
    return notification
  }

  async findMany(recipientId: string): Promise<Notification[]> {
    return this.notifications.filter(
      (notification) => notification.recipientId === recipientId
    )
  }

  async findManyUnreceived(): Promise<Notification[]> {
    return this.notifications.filter(
      (notification) => notification.discordNotified === false
    )
  }
  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex(
      (item) => item.id === notification.id
    )

    if (notificationIndex >= 0) {
      this.notifications[notificationIndex] = notification
    }
  }

  async markReceivedNotifications(): Promise<void> {
    this.notifications.map((notification) => notification.discordNotify())
  }
}
