import { VerifyHasNotifications } from '@application/use-cases/verify-has-notification'
import { Controller, Get, Param, Body, Post } from '@nestjs/common'
import { CreateNotificationBody } from '../dtos/create-notification-body'
import { SendNotification } from '../../../application/use-cases/send-notification'
import { Content } from '@application/entities/content'
import { NotificationViewModel } from '../view-models/notification-view-model'
import { GetRecipientNotifications } from '@application/use-cases/get-recipient-notifications'
import { GetPublicKey } from '@application/use-cases/get-public-key-push-notification'
import { CreateSubscriptionNotificationUrl } from '@application/use-cases/create-subscription-notification'
import { GetDiscordUnreceivedNotifications } from '@application/use-cases/get-discord-unreceived-notifications-by-recipient-id'
import { DiscordReceivedNotification } from '../../../application/use-cases/discord-received-notification'

@Controller('/notifications')
export class NotificationsController {
  constructor(
    private verifyHasNotifications: VerifyHasNotifications,
    private sendNotification: SendNotification,
    private getRecipientNotifications: GetRecipientNotifications,
    private getDiscordUnreceivedNotifications: GetDiscordUnreceivedNotifications,
    private discordReceivedNotifications: DiscordReceivedNotification
  ) {}

  @Get('/from/:recipientId')
  async verifyRecipientIdHasNotifications(@Param('recipientId') id: string) {
    const hasNotification = await this.verifyHasNotifications.execute({
      recipientId: id
    })
    return hasNotification
  }

  @Get('/from/:recipientId/all')
  async getLastNotifications(@Param('recipientId') id: string) {
    const notifications = await this.getRecipientNotifications.execute({
      recipientId: id
    })
    return notifications.map(NotificationViewModel.toHttp)
  }

  @Get('/discord/all')
  async getDiscordLastNotifications() {
    const notifications = await this.getDiscordUnreceivedNotifications.execute()
    return notifications.map(NotificationViewModel.toHttp)
  }

  @Get('/discord/receive')
  async receivedAllNotifications() {
    await this.discordReceivedNotifications.execute()
  }
  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, chapter, mangaSlug, discordId } = body

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content: new Content(content),
      chapter,
      mangaSlug,
      discordId
    })
    return { notification: NotificationViewModel.toHttp(notification) }
  }
}

@Controller('/push_notification')
export class PushNotificationController {
  constructor(
    private getPublicKey: GetPublicKey,
    private createSubscription: CreateSubscriptionNotificationUrl
  ) {}
  @Get('/public_key')
  getPushNotificationPublicKey() {
    const publicKey = this.getPublicKey.execute()
    return publicKey
  }
  @Post('/')
  async createSubscriptionNotificationUrl(
    @Body()
    body: {
      p256dh: string
      auth: string
      recipientId: string
      url: string
    }
  ) {
    await this.createSubscription.execute({ ...body })
  }
}
