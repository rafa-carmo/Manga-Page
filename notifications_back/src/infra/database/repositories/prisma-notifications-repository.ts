import { Injectable } from '@nestjs/common'
import { PrismaService } from '@infra/services/prisma.service'
import { Notification } from '@application/entities/notification'
import { NotificationRepository } from '@application/repositories/notification-repository'
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper'
import { NotificationNotFound } from '../../../application/use-cases/errors/notification-not-found'

@Injectable()
export class PrismaNotificationsRepository implements NotificationRepository {
  constructor(private prismaService: PrismaService) {}

  async findMany(recipientId: string): Promise<Notification[]> {
    const notifications = await this.prismaService.notification.findMany({
      where: {
        recipientId
      },
      take: 20
    })

    return notifications.map(PrismaNotificationMapper.toDomain)
  }
  async findManyUnreceived(): Promise<Notification[]> {
    const notifications = await this.prismaService.notification.findMany({
      where: {
        discordNotified: false
      }
    })

    return notifications.map(PrismaNotificationMapper.toDomain)
  }
  async findById(notificationId: string): Promise<Notification | null> {
    const notification = await this.prismaService.notification.findUnique({
      where: {
        id: notificationId
      }
    })

    if (!notification) {
      throw new NotificationNotFound()
    }

    return PrismaNotificationMapper.toDomain(notification)
  }

  async haveNotification(recipientId: string): Promise<boolean> {
    const notifications = await this.prismaService.notification.findMany({
      where: {
        recipientId
      },
      take: 20
    })

    if (notifications.length <= 0) {
      return false
    }

    const hasNotificaiton = notifications.find((notification) => {
      if (notification.recipientId === recipientId) {
        if (!notification.readAt) {
          return true
        }
      }
    })

    return !!hasNotificaiton
  }

  async create(notification: Notification): Promise<void> {
    await this.prismaService.notification.create({
      data: PrismaNotificationMapper.toPrisma(notification)
    })
  }

  async save(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification)
    await this.prismaService.notification.update({
      where: { id: raw.id },
      data: raw
    })
  }
  async markReceivedNotifications(): Promise<void> {
    await this.prismaService.notification.updateMany({
      where: {
        discordNotified: false
      },
      data: {
        discordNotified: true
      }
    })
  }
}
