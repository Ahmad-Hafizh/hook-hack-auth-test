/*
  Warnings:

  - You are about to drop the column `job_id` on the `planning_how` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "planning_how" DROP COLUMN "job_id",
ADD COLUMN     "job_id_render" TEXT,
ADD COLUMN     "job_id_variant" TEXT;
