import { PushNotification } from '@application/entities/push-notification'
import { PushNotificationRepository } from '@application/repositories/push-notification-repository'
import * as dotenv from 'dotenv'
dotenv.config()

export class InMemoryPushNotificationsRepository
  implements PushNotificationRepository
{
  public pushNotificationsUrls: PushNotification[] = []
  async createSubscriptionNotificationUrl(PushNotification: PushNotification) {
    this.pushNotificationsUrls.push(PushNotification)
  }
  getPublicKey(): string {
    return process.env.PUBLIC_KEY || ''
  }

  async getUrlsByRecipientId(recipientId: string): Promise<PushNotification[]> {
    return this.pushNotificationsUrls.filter(
      (register) => register.recipientId === recipientId
    )
  }

  sendPushNotification(PushNotification: PushNotification): void {
    console.log(PushNotification)
  }
}
