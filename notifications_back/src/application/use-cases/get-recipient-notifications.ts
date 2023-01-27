import { Injectable } from '@nestjs/common'
import { NotificationRepository } from '../repositories/notification-repository'

interface GetRecipientNotificationsProps {
  recipientId: string
}

@Injectable()
export class GetRecipientNotifications {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(request: GetRecipientNotificationsProps) {
    const { recipientId } = request

    const notifications = await this.notificationRepository.findMany(
      recipientId
    )

    return notifications
  }
}
