import { PushNotification } from '@application/entities/push-notification'
import { PushNotificationUrls as RawPushNotification } from '@prisma/client'
export class PrismaPushNotificationMapper {
  static toDomain(raw: RawPushNotification): PushNotification {
    return new PushNotification({
      recipientId: raw.recipientId,
      url: raw.url,
      auth: raw.auth,
      p256dh: raw.p256dh
    })
  }
}
