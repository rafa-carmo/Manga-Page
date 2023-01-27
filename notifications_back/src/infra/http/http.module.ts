import { SendNotification } from '@application/use-cases/send-notification'

import { GetRecipientNotifications } from '@application/use-cases/get-recipient-notifications'
import { DatabaseModule } from '@infra/database/database.module'
import { Module } from '@nestjs/common'
import {
  NotificationsController,
  PushNotificationController
} from './controllers/app.controller'
import { VerifyHasNotifications } from '@application/use-cases/verify-has-notification'
import { GetPublicKey } from '@application/use-cases/get-public-key-push-notification'
import { CreateSubscriptionNotificationUrl } from '@application/use-cases/create-subscription-notification'

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController, PushNotificationController],
  providers: [
    SendNotification,
    GetRecipientNotifications,
    VerifyHasNotifications,
    GetPublicKey,
    CreateSubscriptionNotificationUrl
  ]
})
export class HttpModule {}
