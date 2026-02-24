/*
  Warnings:

  - You are about to drop the column `competitor_urls` on the `planning_what` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "competitor_matrix" ALTER COLUMN "cta" DROP NOT NULL,
ALTER COLUMN "cta_tags" DROP NOT NULL,
ALTER COLUMN "key_message_tags" DROP NOT NULL,
ALTER COLUMN "strong_points_tags" DROP NOT NULL;

-- AlterTable
ALTER TABLE "key_visual" ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "screenshot_url" DROP NOT NULL,
ALTER COLUMN "meta_description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "planning_what" DROP COLUMN "competitor_urls";
