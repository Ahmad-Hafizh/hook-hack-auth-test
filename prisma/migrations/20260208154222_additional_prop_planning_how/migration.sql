-- AlterTable
ALTER TABLE "RenderedVideo" ADD COLUMN     "visualIdHash" TEXT;

-- AlterTable
ALTER TABLE "planning_how" ADD COLUMN     "font" TEXT,
ADD COLUMN     "job_id" TEXT,
ADD COLUMN     "orientation" TEXT,
ADD COLUMN     "voice_id" TEXT;

-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
    "userId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "originalName" TEXT,
    "type" TEXT NOT NULL,
    "slot" TEXT,
    "bucket" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "mimeType" TEXT,
    "fileSize" BIGINT,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "metadata" JSONB,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "templateKey" TEXT,
    "expiresAt" TIMESTAMPTZ(6),

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Media_createdAt_idx" ON "Media"("createdAt");

-- CreateIndex
CREATE INDEX "Media_expiresAt_idx" ON "Media"("expiresAt");

-- CreateIndex
CREATE INDEX "Media_userId_idx" ON "Media"("userId");

-- CreateIndex
CREATE INDEX "Media_userId_slot_idx" ON "Media"("userId", "slot");

-- CreateIndex
CREATE INDEX "Media_userId_type_idx" ON "Media"("userId", "type");

-- CreateIndex
CREATE INDEX "Media_user_template_idx" ON "Media"("userId", "templateKey");

-- CreateIndex
CREATE UNIQUE INDEX "Media_bucket_path_unique" ON "Media"("bucket", "path");

-- CreateIndex
CREATE INDEX "RenderedVideo_pdca_session_idx" ON "RenderedVideo"("pdca_session_id");

-- CreateIndex
CREATE INDEX "RenderedVideo_visualIdHash_idx" ON "RenderedVideo"("visualIdHash");

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
