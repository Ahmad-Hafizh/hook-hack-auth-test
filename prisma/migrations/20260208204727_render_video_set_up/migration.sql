/*
  Warnings:

  - You are about to drop the column `createdAt` on the `RenderedVideo` table. All the data in the column will be lost.
  - You are about to drop the column `videoUrl` on the `RenderedVideo` table. All the data in the column will be lost.
  - You are about to drop the column `visualIdHash` on the `RenderedVideo` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[visual_id_hash]` on the table `RenderedVideo` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "RenderedVideo_visualIdHash_idx";

-- AlterTable
ALTER TABLE "RenderedVideo" DROP COLUMN "createdAt",
DROP COLUMN "videoUrl",
DROP COLUMN "visualIdHash",
ADD COLUMN     "attempts" INTEGER,
ADD COLUMN     "error" TEXT,
ADD COLUMN     "index" INTEGER,
ADD COLUMN     "render_id" TEXT,
ADD COLUMN     "status" TEXT,
ADD COLUMN     "template_id" TEXT,
ADD COLUMN     "url" TEXT,
ADD COLUMN     "visual_id_hash" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "RenderedVideo_visual_id_hash_key" ON "RenderedVideo"("visual_id_hash");
