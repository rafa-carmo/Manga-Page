/*
  Warnings:

  - Added the required column `auth` to the `PushNotificationUrls` table without a default value. This is not possible if the table is not empty.
  - Added the required column `p256dh` to the `PushNotificationUrls` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PushNotificationUrls" ADD COLUMN     "auth" TEXT NOT NULL,
ADD COLUMN     "p256dh" TEXT NOT NULL;
