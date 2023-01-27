import { Module } from '@nestjs/common'

import { PrismaNotificationsRepository } from './repositories/prisma-notifications-repository'
import { PrismaService } from '@infra/services/prisma.service'
import { NotificationRepository } from '@application/repositories/notification-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationRepository,
      useClass: PrismaNotificationsRepository
    }
  ],
  exports: [NotificationRepository]
})
export class DatabaseModule {}
