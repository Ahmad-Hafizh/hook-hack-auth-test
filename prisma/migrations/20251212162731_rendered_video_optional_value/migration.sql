-- AlterTable
ALTER TABLE "RenderedVideo" ALTER COLUMN "bodyAMessage" DROP NOT NULL,
ALTER COLUMN "bodyBMessage" DROP NOT NULL,
ALTER COLUMN "bodyCMessage" DROP NOT NULL,
ALTER COLUMN "cta" DROP NOT NULL,
ALTER COLUMN "hook" DROP NOT NULL;

-- CreateTable
CREATE TABLE "GoogleAdsCredential" (
    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
    "userId" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "customerIds" TEXT[],
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GoogleAdsCredential_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GoogleAdsCredential_userId_key" ON "GoogleAdsCredential"("userId");
