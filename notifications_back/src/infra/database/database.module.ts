import { Module } from '@nestjs/common'

import { PrismaNotificationsRepository } from './repositories/prisma-notifications-repository'
import { PrismaService } from '@infra/services/prisma.service'
import { NotificationRepository } from '@application/repositories/notification-repository'
import { PushNotificationRepository } from '@application/repositories/push-notification-repository'
import { PrismaPushNotificationRepository } from './repositories/prisma-push-notification-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationRepository,
      useClass: PrismaNotificationsRepository
    },
    {
      provide: PushNotificationRepository,
      useClass: PrismaPushNotificationRepository
    }
  ],
  exports: [NotificationRepository, PushNotificationRepository]
})
export class DatabaseModule {}
