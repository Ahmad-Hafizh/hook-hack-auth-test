/*
  Warnings:

  - You are about to drop the column `bg_image_provider` on the `planning_how` table. All the data in the column will be lost.
  - You are about to drop the column `bgm` on the `planning_how` table. All the data in the column will be lost.
  - You are about to drop the column `cta_color` on the `planning_how` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `planning_how` table. All the data in the column will be lost.
  - You are about to drop the column `main_color` on the `planning_how` table. All the data in the column will be lost.
  - You are about to drop the column `ratio` on the `planning_how` table. All the data in the column will be lost.
  - You are about to drop the column `voice_id` on the `planning_how` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "planning_how" DROP COLUMN "bg_image_provider",
DROP COLUMN "bgm",
DROP COLUMN "cta_color",
DROP COLUMN "gender",
DROP COLUMN "main_color",
DROP COLUMN "ratio",
DROP COLUMN "voice_id",
ADD COLUMN     "background_color" TEXT,
ADD COLUMN     "background_image" TEXT,
ADD COLUMN     "background_music" TEXT,
ADD COLUMN     "template" TEXT,
ADD COLUMN     "voice_over" TEXT;
