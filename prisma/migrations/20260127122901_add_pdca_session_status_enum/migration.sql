/*
  Warnings:

  - You are about to drop the column `bodyC_messages` on the `PlanningVariants` table. All the data in the column will be lost.
  - You are about to drop the column `bodyCMessage` on the `RenderedVideo` table. All the data in the column will be lost.
  - The `status` column on the `pdca_session` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `PlanningPlan` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `name` on table `pdca` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updatedAt` to the `pdca_session` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `pdca_session` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "PDCAStatus" AS ENUM ('in_progress', 'running', 'completed', 'cancelled');

-- DropForeignKey
ALTER TABLE "PlanningPlan" DROP CONSTRAINT "PlanningPlan_pdca_session_id_fkey";

-- AlterTable
ALTER TABLE "PlanningVariants" DROP COLUMN "bodyC_messages";

-- AlterTable
ALTER TABLE "RenderedVideo" DROP COLUMN "bodyCMessage";

-- AlterTable
ALTER TABLE "pdca" ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "pdca_session" ADD COLUMN     "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMPTZ(6) NOT NULL,
ADD COLUMN     "videoDuration" INTEGER,
ALTER COLUMN "name" SET NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "PDCAStatus" NOT NULL DEFAULT 'in_progress';

-- DropTable
DROP TABLE "PlanningPlan";
