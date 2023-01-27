import { PushNotification } from '@application/entities/push-notification'

export abstract class PushNotificationRepository {
  abstract getPublicKey(): string
  abstract createSubscriptionNotificationUrl(
    PushNotification: PushNotification
  ): Promise<void>
  abstract getUrlsByRecipientId(
    recipientId: string
  ): Promise<PushNotification[]>
  abstract sendPushNotification(
    PushNotification: PushNotification,
    message: string
  ): void
}
