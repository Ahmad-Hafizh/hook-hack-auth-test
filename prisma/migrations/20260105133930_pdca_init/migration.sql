/*
  Warnings:

  - You are about to drop the column `planningSessionId` on the `Ads` table. All the data in the column will be lost.
  - You are about to drop the column `planningSessionId` on the `PlanningPlan` table. All the data in the column will be lost.
  - You are about to drop the column `planningSessionId` on the `PlanningVariants` table. All the data in the column will be lost.
  - You are about to drop the column `planningSessionId` on the `RenderedVideo` table. All the data in the column will be lost.
  - You are about to drop the `CreativeBrief` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PlanningSession` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[pdca_session_id]` on the table `PlanningPlan` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[pdca_session_id]` on the table `PlanningVariants` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pdca_session_id` to the `Ads` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pdca_session_id` to the `PlanningPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pdca_session_id` to the `PlanningVariants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pdca_session_id` to the `RenderedVideo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Ads" DROP CONSTRAINT "Ads_planningSessionId_fkey";

-- DropForeignKey
ALTER TABLE "CreativeBrief" DROP CONSTRAINT "CreativeBrief_planningSessionId_fkey";

-- DropForeignKey
ALTER TABLE "PlanningPlan" DROP CONSTRAINT "PlanningPlan_planningSessionId_fkey";

-- DropForeignKey
ALTER TABLE "PlanningSession" DROP CONSTRAINT "PlanningSession_userId_fkey";

-- DropForeignKey
ALTER TABLE "PlanningVariants" DROP CONSTRAINT "PlanningVariants_planningSessionId_fkey";

-- DropForeignKey
ALTER TABLE "RenderedVideo" DROP CONSTRAINT "RenderedVideo_planningSessionId_fkey";

-- DropIndex
DROP INDEX "PlanningPlan_planningSessionId_key";

-- DropIndex
DROP INDEX "PlanningVariants_planningSessionId_key";

-- AlterTable
ALTER TABLE "Ads" DROP COLUMN "planningSessionId",
ADD COLUMN     "pdca_session_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PlanningPlan" DROP COLUMN "planningSessionId",
ADD COLUMN     "pdca_session_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PlanningVariants" DROP COLUMN "planningSessionId",
ADD COLUMN     "pdca_session_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "RenderedVideo" DROP COLUMN "planningSessionId",
ADD COLUMN     "pdca_session_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "CreativeBrief";

-- DropTable
DROP TABLE "PlanningSession";

-- CreateTable
CREATE TABLE "pdca" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "pdca_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pdca_session" (
    "id" TEXT NOT NULL,
    "pdca_id" TEXT NOT NULL,
    "finishedAt" TIMESTAMPTZ(6),
    "lastPage" "PlanningPages",
    "product" TEXT,
    "competitors" TEXT[],
    "keyword" TEXT,

    CONSTRAINT "pdca_session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "competitor_matrix" (
    "id" TEXT NOT NULL,
    "keyMessages" TEXT,
    "strongPoints" TEXT[],
    "pdca_session_id" TEXT NOT NULL,

    CONSTRAINT "competitor_matrix_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "competitor_matrix_pdca_session_id_key" ON "competitor_matrix"("pdca_session_id");

-- CreateIndex
CREATE UNIQUE INDEX "PlanningPlan_pdca_session_id_key" ON "PlanningPlan"("pdca_session_id");

-- CreateIndex
CREATE UNIQUE INDEX "PlanningVariants_pdca_session_id_key" ON "PlanningVariants"("pdca_session_id");

-- AddForeignKey
ALTER TABLE "pdca" ADD CONSTRAINT "pdca_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pdca_session" ADD CONSTRAINT "pdca_session_pdca_id_fkey" FOREIGN KEY ("pdca_id") REFERENCES "pdca"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "competitor_matrix" ADD CONSTRAINT "competitor_matrix_pdca_session_id_fkey" FOREIGN KEY ("pdca_session_id") REFERENCES "pdca_session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanningPlan" ADD CONSTRAINT "PlanningPlan_pdca_session_id_fkey" FOREIGN KEY ("pdca_session_id") REFERENCES "pdca_session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanningVariants" ADD CONSTRAINT "PlanningVariants_pdca_session_id_fkey" FOREIGN KEY ("pdca_session_id") REFERENCES "pdca_session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RenderedVideo" ADD CONSTRAINT "RenderedVideo_pdca_session_id_fkey" FOREIGN KEY ("pdca_session_id") REFERENCES "pdca_session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ads" ADD CONSTRAINT "Ads_pdca_session_id_fkey" FOREIGN KEY ("pdca_session_id") REFERENCES "pdca_session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
