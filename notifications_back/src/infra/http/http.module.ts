import { SendNotification } from '@application/use-cases/send-notification'
import { GetRecipientNotifications } from '@application/use-cases/get-recipient-notifications'
import { DatabaseModule } from '@infra/database/database.module'
import { Module } from '@nestjs/common'
import { NotificationsController } from './controllers/app.controller'
import { VerifyHasNotifications } from '@application/use-cases/verify-has-notification'

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    GetRecipientNotifications,
    VerifyHasNotifications
  ]
})
export class HttpModule {}
