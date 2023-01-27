-- CreateTable
CREATE TABLE "PushNotificationUrls" (
    "id" TEXT NOT NULL,
    "recipientId" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "PushNotificationUrls_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PushNotificationUrls_recipientId_idx" ON "PushNotificationUrls"("recipientId");
