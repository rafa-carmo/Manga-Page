import { Injectable } from '@nestjs/common'
import { PrismaService } from '@infra/services/prisma.service'
import { PushNotificationRepository } from '@application/repositories/push-notification-repository'
import { PushNotification } from '@application/entities/push-notification'
import { PrismaPushNotificationMapper } from '../mappers/prisma-push-notification-mapper'
import * as WebPush from 'web-push'

@Injectable()
export class PrismaPushNotificationRepository
  implements PushNotificationRepository
{
  constructor(private prismaService: PrismaService) {}

  getPublicKey(): string {
    return process.env.PUBLIC_KEY || ''
  }
  async createSubscriptionNotificationUrl({
    recipientId,
    url,
    auth,
    p256dh
  }: PushNotification) {
    await this.prismaService.pushNotificationUrls.create({
      data: {
        recipientId,
        url,
        auth,
        p256dh
      }
    })
  }
  async getUrlsByRecipientId(recipientId: string): Promise<PushNotification[]> {
    const pushNotifications =
      await this.prismaService.pushNotificationUrls.findMany({
        where: {
          recipientId
        }
      })

    return pushNotifications.map(PrismaPushNotificationMapper.toDomain)
  }

  sendPushNotification(pushNotification: PushNotification, message: string) {
    WebPush.setVapidDetails(
      'https://localhost:1338',
      process.env.PUBLIC_KEY || '',
      process.env.PRIVATE_KEY || ''
    )
    WebPush.sendNotification(
      {
        endpoint: pushNotification.url,
        keys: {
          auth: pushNotification.auth,
          p256dh: pushNotification.p256dh
        }
      },
      message
    )
  }
}
