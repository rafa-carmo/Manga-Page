import { VerifyHasNotifications } from '@application/use-cases/verify-has-notification'
import { Controller, Get, Param, Body, Post } from '@nestjs/common'
import { CreateNotificationBody } from '../dtos/create-notification-body'
import { SendNotification } from '../../../application/use-cases/send-notification'
import { Content } from '@application/entities/content'
import { NotificationViewModel } from '../view-models/notification-view-model'
import { GetRecipientNotifications } from '@application/use-cases/get-recipient-notifications'

@Controller('/notifications')
export class NotificationsController {
  constructor(
    private verifyHasNotifications: VerifyHasNotifications,
    private sendNotification: SendNotification,
    private getRecipientNotifications: GetRecipientNotifications
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

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, chapter, mangaSlug } = body

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content: new Content(content),
      chapter,
      mangaSlug
    })
    return { notification: NotificationViewModel.toHttp(notification) }
  }
}
