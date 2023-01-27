import { NotificationRepository } from '@application/repositories/notification-repository'
import { Injectable } from '@nestjs/common'

interface VerifyHasNotificationsRequest {
  recipientId: string
}

@Injectable()
export class VerifyHasNotifications {
  constructor(private notificationsRepository: NotificationRepository) {}

  async execute(request: VerifyHasNotificationsRequest): Promise<boolean> {
    const { recipientId } = request

    const hasNotificaiton = await this.notificationsRepository.haveNotification(
      recipientId
    )

    return hasNotificaiton
  }
}
