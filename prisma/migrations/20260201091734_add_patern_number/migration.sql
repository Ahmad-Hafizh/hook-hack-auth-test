/*
  Warnings:

  - Added the required column `pattern_number` to the `positioning_patterns` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "planning_what" ALTER COLUMN "selected_positioning_patterns" SET NOT NULL,
ALTER COLUMN "selected_positioning_patterns" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "positioning_patterns" ADD COLUMN     "pattern_number" TEXT NOT NULL;
