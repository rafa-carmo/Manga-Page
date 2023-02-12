-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "recipientId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "readAt" DATETIME,
    "mangaSlug" TEXT NOT NULL,
    "chapter" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "discordId" TEXT,
    "discordNotified" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "PushNotificationUrls" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "recipientId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "p256dh" TEXT NOT NULL,
    "auth" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "Notification_recipientId_idx" ON "Notification"("recipientId");

-- CreateIndex
CREATE INDEX "PushNotificationUrls_recipientId_idx" ON "PushNotificationUrls"("recipientId");
