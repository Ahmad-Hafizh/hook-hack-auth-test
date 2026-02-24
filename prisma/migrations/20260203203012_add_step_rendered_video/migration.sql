/*
  Warnings:

  - You are about to drop the column `bodyAMessage` on the `RenderedVideo` table. All the data in the column will be lost.
  - You are about to drop the column `bodyBMessage` on the `RenderedVideo` table. All the data in the column will be lost.
  - You are about to drop the column `cta` on the `RenderedVideo` table. All the data in the column will be lost.
  - You are about to drop the column `hook` on the `RenderedVideo` table. All the data in the column will be lost.
  - You are about to drop the column `videoDuration` on the `pdca_session` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "RenderedVideo" DROP COLUMN "bodyAMessage",
DROP COLUMN "bodyBMessage",
DROP COLUMN "cta",
DROP COLUMN "hook";

-- AlterTable
ALTER TABLE "pdca_session" DROP COLUMN "videoDuration",
ADD COLUMN     "step" INTEGER DEFAULT 1;
