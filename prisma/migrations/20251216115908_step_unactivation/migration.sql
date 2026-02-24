/*
  Warnings:

  - The values [switch] on the enum `PlanningPages` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `lastStep` on the `PlanningSession` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PlanningPages_new" AS ENUM ('what_scratch', 'what_skip', 'how', 'generation');
ALTER TABLE "PlanningSession" ALTER COLUMN "lastPage" TYPE "PlanningPages_new" USING ("lastPage"::text::"PlanningPages_new");
ALTER TYPE "PlanningPages" RENAME TO "PlanningPages_old";
ALTER TYPE "PlanningPages_new" RENAME TO "PlanningPages";
DROP TYPE "public"."PlanningPages_old";
COMMIT;

-- AlterTable
ALTER TABLE "PlanningSession" DROP COLUMN "lastStep";
